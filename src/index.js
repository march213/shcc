import Two from 'two.js';
import * as utils from './utils';

const container = document.querySelector('section');
const params = {
  width: 500,
  height: 500,
};

const two = new Two(params).appendTo(container);

const loopDuration = 60 * 8; // 8 seconds

const shapes = [];
const shapesCount = 40;
const shapeMin = 0;
const shapeMax = two.width;
const shapeDiff = shapeMax - shapeMin;

const aDelay = 1 / 120;
const centerX = two.width / 2;
const centerY = two.height / 2;

for (let i = 0; i < shapesCount; i++) {
  const shape = two.makeRectangle(centerX, i * 20, 500, 10);
  shape.fill = 'rgb(0, 220, 255)';
  shape.noStroke();

  shapes.push(shape);
}

two.bind('update', function (frameCount) {
  const currentFrame = frameCount % loopDuration;
  const t = currentFrame / loopDuration;

  shapes.forEach((shape, i) => {
    const aStart = aDelay * (shapesCount - i);
    const aEnd = aDelay * i;

    let u;

    if (t < 0.5) {
      u = utils.mapAndClamp(t, aStart, 0.5 - aEnd, 0, 1);
    } else {
      u = utils.mapAndClamp(t, 0.5 + aStart, 1 - aEnd, 1, 0);
    }

    shape.width = shapeMin + shapeDiff * utils.easeInOutCubic(u);
  });
});

two.play();
