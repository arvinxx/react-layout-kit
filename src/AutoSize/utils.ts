import { CellType, LayoutCell, Result, ResultCell } from './type';

type NodeMap = Map<string, ResultCell>;

/**
 * 递归法获取节点比例
 * @param children
 * @param nodeMap
 */
const recursionWidthAspectRadio = (children: CellType[], nodeMap: NodeMap): number => {
  return children
    .map((i) => {
      switch (i.type) {
        case 'image':
          nodeMap.set(i.id, { aspectRatio: i.aspectRatio, height: 0, width: 0 });
          return i.aspectRatio;

        case 'cell':
          // eslint-disable-next-line no-case-declarations
          let relativeNum = 0;

          i.children.forEach((node) => {
            switch (node.type) {
              case 'image':
                nodeMap.set(node.id, {
                  aspectRatio: node.aspectRatio,
                  height: 0,
                  width: 0,
                });
                relativeNum += 1 / node.aspectRatio;
                break;
              case 'cell':
                // eslint-disable-next-line no-case-declarations
                const x = recursionWidthAspectRadio(node.children, nodeMap);
                console.log('cell aspectRadio', x);
                relativeNum += x;
            }
          });

          // eslint-disable-next-line no-case-declarations
          const aspectRatio = 1 / relativeNum;

          nodeMap.set(i.id, { aspectRatio, height: 0, width: 0 });

          return aspectRatio;

        default:
          return 0;
      }
    })
    .reduce((a, b) => a + b);
};

export const recursionLayout = (layout: LayoutCell, width: number, nodeMap: NodeMap): number => {
  // 纵向布局求解方案
  if (layout.vertical) {
    // 先初始化设置一轮宽高
    layout.children.forEach((cell) => {
      switch (cell.type) {
        case 'image':
          nodeMap.set(cell.id, {
            width,
            aspectRatio: cell.aspectRatio,
            height: width / cell.aspectRatio,
          });
          break;
        // 如果是单元的话，仍然按照之前的方式做一轮计算
        case 'cell':
          // eslint-disable-next-line no-case-declarations
          const height = recursionLayout(cell, width, nodeMap);
          nodeMap.set(cell.id, {
            width,
            aspectRatio: width / height,
            height: height,
          });
      }
    });

    let height: number = 0;
    layout.children.forEach((cell) => {
      height += nodeMap.get(cell.id)!.height;
    });
    return height;
  } else {
    // 计算高度
    const aspectRatio = recursionWidthAspectRadio(layout.children, nodeMap);

    const height = width / aspectRatio;

    layout.children.forEach((node) => {
      switch (node.type) {
        case 'image':
          nodeMap.set(node.id, {
            ...nodeMap.get(node.id)!,
            height,
            width: height * node.aspectRatio,
          });
          break;
        case 'cell':
          // eslint-disable-next-line no-case-declarations
          const width = nodeMap.get(node.id)!.aspectRatio * height;

          nodeMap.set(node.id, { ...nodeMap.get(node.id)!, height, width });

          recursionLayout(node, width, nodeMap);
          break;
      }
    });

    return height;
  }
};
// 返回布局结果
export const clacLayout = (layout: LayoutCell, width: number): Result => {
  const nodeMap: NodeMap = new Map();

  // 初始化
  nodeMap.set(layout.id, {
    width,
    height: 0,
    aspectRatio: 0,
  });

  const height = recursionLayout(layout, width, nodeMap);

  // 重新赋值高度
  nodeMap.set(layout.id, {
    ...nodeMap.get(layout.id)!,
    height: height,
    aspectRatio: width / height,
  });
  // 最终用将结果 return
  const result = {};

  Array.from(nodeMap.entries()).forEach(([id, value]) => {
    // @ts-ignore
    result[id] = value;
  });
  return result;
};