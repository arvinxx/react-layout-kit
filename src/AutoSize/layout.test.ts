import { clacLayout } from '@/AutoSize/utils';
import { LayoutCell, Result } from './type';

describe('布局算法：', () => {
  describe('以两张图横着排基础', () => {
    it('基础', () => {
      const layout: LayoutCell = {
        type: 'cell',
        id: '1',
        children: [
          { type: 'image', id: '2', aspectRatio: 1 },
          { type: 'image', id: '3', aspectRatio: 2 },
        ],
      };

      const images = clacLayout(layout, 750);

      const result: Result = {
        '1': {
          width: 750,
          height: 250,
          aspectRatio: 3,
        },
        '2': {
          width: 250,
          height: 250,
          aspectRatio: 1,
        },
        '3': {
          width: 500,
          height: 250,
          aspectRatio: 2,
        },
      };

      expect(images).toEqual(result);
    });
    it('第三张插到两张的下方', () => {
      const layout: LayoutCell = {
        id: '0',
        type: 'cell',
        vertical: true,
        children: [
          {
            type: 'cell',
            id: '1',
            children: [
              { type: 'image', id: '2', aspectRatio: 1 },
              { type: 'image', id: '3', aspectRatio: 2 },
            ],
          },
          {
            type: 'image',
            id: '4',
            aspectRatio: 1,
          },
        ],
      };
      const images = clacLayout(layout, 750);

      const result: Result = {
        '0': {
          width: 750,
          height: 1000,
          aspectRatio: 0.75,
        },
        '1': {
          width: 750,
          height: 250,
          aspectRatio: 3,
        },
        '2': {
          width: 250,
          height: 250,
          aspectRatio: 1,
        },
        '3': {
          width: 500,
          height: 250,
          aspectRatio: 2,
        },
        '4': {
          aspectRatio: 1,
          width: 750,
          height: 750,
        },
      };

      expect(images).toEqual(result);
    });
  });
});
