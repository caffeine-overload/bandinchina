<p align="center"> 
  <img src="public/assets/images/mei-circle-crop.png">
  
  <p align="center"><i>"The only thing necessary for the triumph of evil is for good men to do nothing."</i></p>
  <p align="center">- Edmund Burke</p>
</p> 

## Summary
This is a comprehensive repository for many, if not all, topics related to Hong Kong.

<a name="links">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/ElementBlaster/gh-pages/assets/favicons/favicon-16x16.png">
      Linking Pleasures
  </h2>  
</a>

- [Destroy thy Enemies](#destroy)
- [Easy, too easy?](#difficulty)
- [Collision Logic](#collision-logic)
- [Projectile Logic](#projectile-logic)
- [Project Direction](#project-direction)

<a name="technologies">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/ElementBlaster/gh-pages/assets/favicons/favicon-16x16.png">
      Technologies
  </h2>  
</a>
  
|HTML5/CSS3/JavaScript|
|:-------------------------:|
|<img src="https://github.com/MoistCode/ImaginaryNumblr/blob/master/readme_gifs/Webp.net-resizeimage(4).png">|

<a name="destroy">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/ElementBlaster/gh-pages/assets/favicons/favicon-16x16.png">
      Destroy thy Enemies with Rapid Elemental Blasts!
  </h2>  
</a>
  By using the traditional WASD keys to move, QE to change elemnts, and arrow keys to BLAST your ways through barrages of enemies; feeling satisfaction after a days work can never be as easy as BOOM BOOM POW! Choose the correct elements based on what elements are trying to destroy you. Dodge bullets, make things go BOOM, and feel empowered!

<a name="difficulty">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/ElementBlaster/gh-pages/assets/favicons/favicon-16x16.png">
      Too easy? Change difficulty and try thy hand at becoming the top...sphere??
  </h2>  
</a>
  Is one enemy too hard? What about two, or five, or twenty! With the option of choosing difficulties, you're able to leave feeling as if you have completed your thesis on...spherical..heroes? I don't know. Just know that you're able to change difficulties. There's even an endless mode for FOREVER BOOM BOOMS!

<a name="collision-logic">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/ElementBlaster/gh-pages/assets/favicons/favicon-16x16.png">
      Sample Collision Logic
  </h2>  
</a>

  Now comes the math portion because math is everywhere. With some slight manipulation of the One-Dimensional Newtonian formula and the Pythagorean formula, collisions and their corresponding angle/velocity responses make the game look very natural like an organic cow. Go ahead, throw a rock and see what happens. Yeah that's Physics and Mathematics but more on that in the future. On a two-dimensional plane, the formula was difficult to adapt to at first, but thanks to [Chris Course](https://www.youtube.com/channel/UC9Yp2yz6-pwhQuPlIDV_mjA) and the [elastic collision](https://en.wikipedia.org/wiki/Elastic_collision) wikipedia, I was able to manipulate the formula on a two-dimensional plane while maintaining the integrity of the responding angles.

``` javascript
  const handleCollision = (player1, player2) => {
  let x1 = player1.coordX;
  let y1 = player1.coordY;

  let x2 = player2.coordX;
  let y2 = player2.coordY;

  let dx = x2 - x1;
  let dy = y2 - y1;

  let rotatedAngle = -Math.atan2(dy, dx);

  let u1 = oneDRotation({ x: player1.velocityX, y: player1.velocityY }, rotatedAngle);
  let u2 = oneDRotation({ x: player2.velocityX, y: player2.velocityY }, rotatedAngle);

  let v1 = { x: u2.x, y: u1.y };
  let v2 = { x: u1.x, y: u2.y };

  let finalVel1 = oneDRotation(v1, -rotatedAngle);
  let finalVel2 = oneDRotation(v2, -rotatedAngle);

  player1.velocityX = finalVel1.x;
  player1.velocityY = finalVel1.y;

  player2.velocityX = finalVel2.x;
  player2.velocityY = finalVel2.y;

  let xPow = Math.pow(player2.coordX - player1.coordX, 2);
  let yPow = Math.pow(player2.coordY - player1.coordY, 2);
  let distance = Math.sqrt(xPow + yPow);

};

const oneDRotation = (velocity, angle) => {
  const rotatedVelocities = {
      x: velocity.x * Math.cos(angle * (180/Math.PI)) - velocity.y * Math.sin(angle * (180/Math.PI)),
      y: velocity.x * Math.sin(angle * (180/Math.PI)) + velocity.y * Math.cos(angle * (180/Math.PI))
  };

  return rotatedVelocities;
}
```

<a name="projectile-logic">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/ElementBlaster/gh-pages/assets/favicons/favicon-16x16.png">
      Sample Projectile Logic
  </h2>  
</a>

  Projectile logic was a tad bit easier as it was limited to only one of the four cardinal directions. By providing a velocity and lifecycle, the bullets were able to become recycled so players don't get a screen full of flying bullets...although that might be a difficulty in the future for the crazy folks. The colors correspond to the elements and depending on what element the player is on, they will only shoot that type of element.

```javascript 
      this.context.beginPath();
        this.context.rect(
          this.posX - (13/2),
          this.posY + 40,
          13,
          13
        );
        switch(this.element) {
          case 'Fire':
            this.context.fillStyle = 'red';
            break;
          case 'Earth':
            this.context.fillStyle = '#7B1803';
            break;
          case 'Lightning':
            this.context.fillStyle = '#F5EE10';
            break;
          case 'Water':
            this.context.fillStyle = 'blue';
            break;
        }
        this.context.fill();
        this.context.closePath();

        this.context.beginPath();
        this.context.arc(this.posX, this.posY + 52, 7, 0, Math.PI);
        this.context.fillStyle = 'white'
        this.context.fill();
        this.context.closePath();

        this.posY += this.velocity;
        this.lifeline -= 1;
```

<a name="project-direction">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/ElementBlaster/gh-pages/assets/favicons/favicon-16x16.png">
      Project Direction
  </h2>  
</a>

* Create gifs on my desktop because my laptop sucks
* Diagonal blasts
* Boss fights 
* Ability to counter elemental bullets by changing player element
* Power-ups
* Different game music options
* Scoring system
