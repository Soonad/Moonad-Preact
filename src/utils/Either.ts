interface EitherLeft<T> {
  isLeft: true;
  isRight: false;
  left: T;
}

interface EitherRight<T> {
  isLeft: false;
  isRight: true;
  right: T;
}

type Either<L, R> = EitherLeft<L> | EitherRight<R>;

export default Either;

export function left<L, R>(val: L): Either<L, R> {
  return { isLeft: true, isRight: false, left: val };
}
export function right<L, R>(val: R): Either<L, R> {
  return { isLeft: false, isRight: true, right: val };
}
