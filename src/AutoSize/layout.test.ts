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

    it('第三张插到1下方', () => {
      const layout: LayoutCell = {
        type: 'cell',
        id: '1',
        children: [
          {
            type: 'cell',
            id: '4',
            children: [
              { type: 'image', id: '2', aspectRatio: 1 },
              { type: 'image', id: '5', aspectRatio: 1 },
            ],
            vertical: true,
          },
          { type: 'image', id: '3', aspectRatio: 2 },
        ],
      };

      const images = clacLayout(layout, 750);

      const result: Result = {
        '1': {
          width: 750,
          height: 300,
          aspectRatio: 2.5,
        },

        '3': {
          width: 600,
          height: 300,
          aspectRatio: 2,
        },
        '4': {
          width: 150,
          height: 300,
          aspectRatio: 0.5,
        },
        '2': {
          width: 150,
          height: 150,
          aspectRatio: 1,
        },
        '5': {
          width: 150,
          height: 150,
          aspectRatio: 1,
        },
      };

      expect(images).toEqual(result);
    });

    it('第四张插到3下方', () => {
      const layout: LayoutCell = {
        type: 'cell',
        id: '1',
        children: [
          {
            type: 'cell',
            id: '4',
            children: [
              { type: 'image', id: '2', aspectRatio: 1 },
              { type: 'image', id: '5', aspectRatio: 1 },
              { type: 'image', id: '6', aspectRatio: 1 },
            ],
            vertical: true,
          },
          { type: 'image', id: '3', aspectRatio: 2 },
        ],
      };

      const images = clacLayout(layout, 700);

      const result: Result = {
        '1': {
          width: 700,
          height: 300,
          aspectRatio: 7 / 3,
        },

        '3': {
          width: 600,
          height: 300,
          aspectRatio: 2,
        },
        '4': {
          width: 100,
          height: 300,
          aspectRatio: 1 / 3,
        },
        '2': {
          width: 100,
          height: 100,
          aspectRatio: 1,
        },
        '5': {
          width: 100,
          height: 100,
          aspectRatio: 1,
        },
        '6': {
          width: 100,
          height: 100,
          aspectRatio: 1,
        },
      };

      expect(images).toEqual(result);
    });
    it('第四张插到2下方', () => {
      const layout: LayoutCell = {
        type: 'cell',
        id: '1',
        children: [
          {
            type: 'cell',
            id: '4',
            children: [
              { type: 'image', id: '2', aspectRatio: 1 },
              { type: 'image', id: '5', aspectRatio: 1 },
            ],
            vertical: true,
          },
          {
            type: 'cell',
            id: '7',
            children: [
              { type: 'image', id: '3', aspectRatio: 2 },
              { type: 'image', id: '6', aspectRatio: 1 },
            ],
            vertical: true,
          },
        ],
      };

      const images = clacLayout(layout, 700);

      // closeTo 的用法 https://jestjs.io/docs/expect#expectclosetonumber-numdigits
      const result: Result = {
        '1': {
          width: 700,
          height: expect.closeTo(600),
          aspectRatio: expect.closeTo(7 / 6),
        },

        '3': {
          width: expect.closeTo(400),
          height: expect.closeTo(200),
          aspectRatio: 2,
        },
        '4': {
          width: expect.closeTo(300),
          height: expect.closeTo(600),
          aspectRatio: 1 / 2,
        },
        '2': {
          width: expect.closeTo(300),
          height: expect.closeTo(300),
          aspectRatio: 1,
        },
        '5': {
          width: expect.closeTo(300),
          height: expect.closeTo(300),
          aspectRatio: 1,
        },
        '6': {
          width: expect.closeTo(400),
          height: expect.closeTo(400),
          aspectRatio: 1,
        },
        '7': {
          width: expect.closeTo(400),
          height: expect.closeTo(600),
          aspectRatio: 2 / 3,
        },
      };

      expect(images).toEqual(result);
    });
    it('第四张图插到123的下方', () => {
      const layout: LayoutCell = {
        type: 'cell',
        id: '7',
        vertical: true,
        children: [
          {
            type: 'cell',
            id: '1',
            children: [
              {
                type: 'cell',
                id: '4',
                children: [
                  { type: 'image', id: '2', aspectRatio: 1 },
                  { type: 'image', id: '5', aspectRatio: 1 },
                ],
                vertical: true,
              },
              { type: 'image', id: '3', aspectRatio: 2 },
            ],
          },
          {
            type: 'image',
            aspectRatio: 1,
            id: '6',
          },
        ],
      };

      const images = clacLayout(layout, 750);

      const result: Result = {
        '1': {
          width: 750,
          height: 300,
          aspectRatio: 2.5,
        },

        '3': {
          width: 600,
          height: 300,
          aspectRatio: 2,
        },
        '4': {
          width: 150,
          height: 300,
          aspectRatio: 0.5,
        },
        '2': {
          width: 150,
          height: 150,
          aspectRatio: 1,
        },
        '5': {
          width: 150,
          height: 150,
          aspectRatio: 1,
        },
        '6': {
          width: 750,
          height: 750,
          aspectRatio: 1,
        },
        '7': {
          width: 750,
          height: 1050,
          aspectRatio: 15 / 21,
        },
      };

      expect(images).toEqual(result);
    });
    it('第四张图插到4的右边', () => {
      const layout: LayoutCell = {
        type: 'cell',
        id: '1',
        children: [
          {
            type: 'cell',
            id: '4',
            children: [
              { type: 'image', id: '2', aspectRatio: 1 },
              { type: 'image', id: '5', aspectRatio: 1 },
            ],
            vertical: true,
          },
          { type: 'image', id: '3', aspectRatio: 2 },
          { type: 'image', id: '6', aspectRatio: 0.5 },
        ],
      };

      const images = clacLayout(layout, 750);

      const result: Result = {
        '1': {
          width: 750,
          height: 250,
          aspectRatio: 3,
        },

        '3': {
          width: 500,
          height: 250,
          aspectRatio: 2,
        },
        '4': {
          width: 125,
          height: 250,
          aspectRatio: 0.5,
        },
        '2': {
          width: 125,
          height: 125,
          aspectRatio: 1,
        },
        '5': {
          width: 125,
          height: 125,
          aspectRatio: 1,
        },
        '6': {
          width: 125,
          height: 250,
          aspectRatio: 0.5,
        },
      };

      expect(images).toEqual(result);
    });
  });

  it('测试又一种布局', () => {
    const layout: LayoutCell = {
      type: 'cell',
      id: '1',
      vertical: true,
      children: [
        { type: 'image', id: '2', aspectRatio: 2 },
        {
          type: 'cell',
          id: '3',
          children: [
            {
              type: 'cell',
              id: '5',
              vertical: true,
              children: [
                { type: 'image', id: '6', aspectRatio: 1 },
                { type: 'image', id: '7', aspectRatio: 1 },
              ],
            },
            { type: 'image', id: '4', aspectRatio: 0.5 },
          ],
        },
      ],
    };

    const images = clacLayout(layout, 600);

    const result: Result = {
      '1': {
        width: 600,
        height: 900,
        aspectRatio: 2 / 3,
      },
      '2': {
        width: 600,
        height: 300,
        aspectRatio: 2,
      },
      '3': {
        width: 600,
        height: 600,
        aspectRatio: 1,
      },
      '4': {
        width: 300,
        height: 600,
        aspectRatio: 0.5,
      },
      '5': {
        width: 300,
        height: 600,
        aspectRatio: 0.5,
      },
      '6': {
        width: 300,
        height: 300,
        aspectRatio: 1,
      },
      '7': {
        width: 300,
        height: 300,
        aspectRatio: 1,
      },
    };

    expect(images).toEqual(result);
  });
  it('多层复杂嵌套', () => {
    const layout: LayoutCell = {
      type: 'cell',
      id: '1',
      vertical: true,
      children: [
        { type: 'image', id: '2', aspectRatio: 2 },
        {
          type: 'cell',
          id: '3',
          children: [
            {
              type: 'cell',
              id: '5',
              vertical: true,
              children: [
                {
                  type: 'cell',
                  id: '8',
                  children: [
                    { type: 'image', id: '6', aspectRatio: 1 },
                    { type: 'image', id: '9', aspectRatio: 1 },
                    { type: 'image', id: '10', aspectRatio: 1 },
                  ],
                },
                { type: 'image', id: '7', aspectRatio: 1 },
              ],
            },
            { type: 'image', id: '4', aspectRatio: 0.5 },
          ],
        },
      ],
    };

    const images = clacLayout(layout, 600);

    const result: Result = {
      '1': {
        width: 600,
        height: 900,
        aspectRatio: 2 / 3,
      },
      '2': {
        width: 600,
        height: 300,
        aspectRatio: 2,
      },
      '3': {
        width: 600,
        height: 600,
        aspectRatio: 1,
      },
      '4': {
        width: 300,
        height: 600,
        aspectRatio: 0.5,
      },
      '5': {
        width: 300,
        height: 600,
        aspectRatio: 0.5,
      },
      '6': {
        width: 300,
        height: 300,
        aspectRatio: 1,
      },
      '7': {
        width: 300,
        height: 300,
        aspectRatio: 1,
      },
    };

    expect(images).toEqual(result);
  });
});
