import Two from 'two.js';
import * as utils from './utils';

const container = document.querySelector('section');
const params = {
  width: 500,
  height: 500,
};

const two = new Two(params).appendTo(container);

const shapes = [];
const shapesCount = 100;
const plotRadius = 50;
const centerX = two.width / 2;
const centerY = two.height / 2;

for (let i = 0; i < shapesCount; i++) {
  // angle: count * 2 * Math.PI / shapesCount;
  const angle = (utils.fullRotation * i) / shapesCount;

  let x = Math.cos(angle) * plotRadius;
  let y = Math.sin(angle) * plotRadius;
  const sWidth = 2;
  const sHeight = 250;

  const rect = two.makeRectangle(x, y, sWidth, sHeight);
  rect.fill = 'rgb(0, 220, 255)';
  rect.noStroke();
  rect.rotation = angle;

  shapes.push(rect);
}

const group = two.makeGroup(shapes);
group.translation.set(centerX, centerY);

two.bind('update', function () {
  group.rotation += 0.001;

  shapes.forEach((shape) => {
    shape.rotation += 0.001;
  });
});

two.play();
