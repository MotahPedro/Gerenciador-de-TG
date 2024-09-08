import { UniqueEntityID } from "./UniqueEntityID";

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

/**
 * @desc Uma entidade representa algo que deve possuir um identificador único
 * e também possui regras de negócio
 */

export abstract class Entity<T> {
  private _id: string;
  public readonly props: T;

  constructor(props: T, id?: string) {
    this._id = id ? id : UniqueEntityID.create().toString();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id === object._id;
  }
}
