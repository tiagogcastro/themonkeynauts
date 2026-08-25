/* eslint-disable max-classes-per-file */
class Right<L, A> {
  constructor(public readonly value: A) {}

  isRight(): this is Right<L, A> {
    return true;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }
}

class Left<L, A> {
  constructor(public readonly value: L) {}

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export function left<L, A>(l: L): Either<L, A> {
  return new Left<L, A>(l);
}

export function right<L, A>(a: A): Either<L, A> {
  return new Right<L, A>(a);
}
