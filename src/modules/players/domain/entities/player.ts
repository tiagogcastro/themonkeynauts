import crypto from 'node:crypto';

type PlayerProps = {
  name: string;
  email: string;
  nickname: string;
}

export class Player {
  private _id: string;
  private props: PlayerProps;

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }
  
  get nickname(): string {
    return this.props.nickname;
  }

  constructor(props: PlayerProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}