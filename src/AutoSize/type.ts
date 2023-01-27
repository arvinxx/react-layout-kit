export interface LayoutCell {
  type: 'cell';
  id: string;
  /**
   * 是否为纵向
   */
  vertical?: boolean;
  children: CellType[];
  width?: number;
  height?: number;
}

/**
 * 一个节点下面的类型可以是纯图片，也可以是复杂的布局单元
 */
export type CellType = ImageNode | LayoutCell;

export interface ImageNode {
  /**
   * 宽高比
   */
  type: 'image';
  id: string;
  aspectRatio: number;
}

export interface ResultCell {
  width: number;
  height: number;
  aspectRatio: number;
}

export interface Result {
  [id: string]: ResultCell;
}
