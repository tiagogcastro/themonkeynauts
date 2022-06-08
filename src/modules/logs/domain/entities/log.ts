import { Commons } from '@shared/types/commons';
import { Maybe } from '@shared/types/maybe';
import crypto from 'node:crypto';

type LogPropsOmittedCommons = {
  playerId: Maybe<string>;
  content: string;
};

type LogProps = LogPropsOmittedCommons & Commons;

export interface ILog extends LogProps {
  id: string;
}

type LogCommons = Partial<
  {
    id: string;
  } & Commons
>;

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

  set assign(props: Partial<LogProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get playerId(): Maybe<string> {
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

  constructor(props: LogPropsOmittedCommons, commons?: LogCommons) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
