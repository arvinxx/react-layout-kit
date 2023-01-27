import { Flexbox } from '@/Flexbox';
import { FC } from 'react';
import { CellType, LayoutCell, Result } from './type';
import { clacLayout } from './utils';

interface LayoutNodeProps extends LayoutCell {
  children: CellType[];
  imageList: any[];
}

const LayoutNode: FC<LayoutNodeProps> = ({ imageList, children, vertical, id, width, height }) => {
  return (
    <Flexbox key={id} height={height} width={width} horizontal={!vertical}>
      {children.map((item) => {
        if (item.type === 'cell') {
          return (
            <LayoutNode key={item.id} imageList={imageList} {...item}>
              {item.children}
            </LayoutNode>
          );
        } else {
          const { aspectRatio, ...image } = imageList.find((i) => i.id === item.id)!;
          return <img key={item.id} {...image} style={{ aspectRatio }} alt={item.id} />;
        }
      })}
    </Flexbox>
  );
};

const assignSize = (layout: LayoutCell, result: Result, imageList: any) => {
  Object.assign(layout, result[layout.id]);

  layout.children.forEach((item) => {
    switch (item.type) {
      case 'cell':
        assignSize(item, result, imageList);
        break;
      case 'image':
        // eslint-disable-next-line array-callback-return
        imageList.find((i: any) => {
          if (i.id === item.id) {
            Object.assign(i, result[i.id]);
          }
        });
    }
  });
};

export interface AutoSizeProps {
  layout: LayoutCell;
  imageList: any[];
}

export const AutoSize: FC<AutoSizeProps> = ({ layout, imageList }) => {
  const result = clacLayout(layout, 1000);

  assignSize(layout, result, imageList);

  console.log(layout);

  return <LayoutNode {...layout} imageList={imageList} />;
};
