import { AutoSize, LayoutCell } from 'react-layout-kit';

const imagesList = new Array(20).fill('').map((_, index) => {
  const width = 400;

  const aspectRatio = Number((Math.random() + 1).toFixed(1));
  const height = (aspectRatio * width).toFixed(0);

  return {
    id: index.toString(),
    // 一个非常好地图片随机生成地址 https://picsum.photos/
    src: `https://picsum.photos/seed/${Math.random()}/${width}/${height}`,
    aspectRatio,
  };
});

const layout: LayoutCell = {
  type: 'cell',
  id: 'c00',
  children: [
    {
      type: 'cell',
      id: 'c11',
      children: [
        { type: 'image', ...imagesList[0] },
        { type: 'image', ...imagesList[4] },
        { type: 'image', ...imagesList[1] },
      ],
      vertical: true,
    },
    {
      type: 'cell',
      id: 'c333',
      vertical: true,
      children: [
        { type: 'image', ...imagesList[9] },
        { type: 'image', ...imagesList[12] },
        { type: 'image', ...imagesList[13] },
      ],
    },
    {
      type: 'cell',
      id: 'c22',
      children: [
        { type: 'image', ...imagesList[2] },
        { type: 'image', ...imagesList[7] },
        { type: 'image', ...imagesList[11] },
      ],
      vertical: true,
    },
  ],
};

export default () => {
  return <AutoSize layout={layout} imageList={imagesList} />;
};
