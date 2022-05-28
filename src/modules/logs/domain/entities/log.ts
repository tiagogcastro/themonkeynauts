import { Commons } from '@shared/types/commons';
import crypto from 'node:crypto';

type Props = {
  playerId: string;
  content: string;
};

type LogProps = Props & Commons;

export interface ILog extends LogProps {
  id: string;
}

export class Log implements ILog {
  private _id: string;

  private _props: LogProps;

  get log(): ILog {
    return {
      id: this._id,
      playerId: this._props.playerId,
      content: this._props.content,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    } as ILog;
  }

  get props(): Props {
    return {
      playerId: this._props.playerId,
      content: this._props.content,
    };
  }

  get id(): string {
    return this._id;
  }

  get playerId(): string {
    return this._props.playerId;
  }

  get content(): string {
    return this._props.content;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(props: LogProps, id?: string) {
    this._id = id ?? crypto.randomUUID();

    this._props = props;
  }
}
