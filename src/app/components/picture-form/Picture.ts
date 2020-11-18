export class Picture {

  private _idPicture: number;
  private _idRecipe: number;
  private _picture: string;


  constructor(idRecipe: number= 1, picture: string= '') {

    this._idRecipe = idRecipe;
    this._picture = picture;
  }



  get idPicture(): number {
    return this._idPicture;
  }

  set idPicture(value: number) {
    this._idPicture = value;
  }

  get idRecipe(): number {
    return this._idRecipe;
  }

  set idRecipe(value: number) {
    this._idRecipe = value;
  }

  get picture(): string {
    return this._picture;
  }

  set picture(value: string) {
    this._picture = value;
  }
}


