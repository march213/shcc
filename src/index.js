import Two from 'two.js';
import * as utils from './utils';

const container = document.querySelector('section');
const params = {
  width: 500,
  height: 500,
};

const two = new Two(params).appendTo(container);

const loopDuration = 60 * 4;
const shapes = [];
const shapeIncrement = 20;
const shapesCount = 40;
const aDelay = 1 / 120;
const centerX = two.width / 2;
const centerY = two.height / 2;

for (let i = 0; i < shapesCount; i++) {
  const size = (shapesCount - i) * shapeIncrement;
  const shape = two.makeRectangle(centerX, centerY, size, size);
  if (i % 2 === 0) {
    shape.fill = 'rgb(0, 220, 255)';
  } else {
    shape.fill = 'rgba(255, 255, 255, 0.7)';
  }

  shape.noStroke();
  shapes.push(shape);
}

two.bind('update', function (frameCount) {
  const currentFrame = frameCount % loopDuration;
  const t = currentFrame / loopDuration;

  shapes.forEach((shape, i) => {
    const aStart = aDelay * i;
    const aEnd = aDelay * (shapesCount - i);

    const u = utils.mapAndClamp(t, aStart, 1 - aEnd, 0, 1);
    shape.rotation = utils.easeInOutCubic(u) * Math.PI;
  });
});

two.play();
