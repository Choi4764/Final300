class Position {
    constructor(posX, posY, posZ, rot) {
      this.posX = posX; //기본값 -9 ~ 9
      this.posY = posY; // 기본값 1
      this.posZ = posZ; // 기본값 -8 ~ 8
      this.rot = rot; // 기본값 0 ~ 360
    }
  }
  
  export default Position;