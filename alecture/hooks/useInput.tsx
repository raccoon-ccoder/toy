import { useCallback, useState } from 'react';

type ReturnTypes<T> = [T, React.Dispatch<React.SetStateAction<T>>, (e: React.FormEvent<HTMLInputElement>) => void];

// 제네릭 사용 이유
// 매개변수 initialData은 제네릭인데 리턴값 배열의 첫번째 인자로 제네릭이기에 매개변수가 만약 string이면 리턴값 첫번째인자도 똑같이 string
const useInput = <T extends unknown>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value as unknown as T);
  }, []);
  return [value, setValue, handler];
};

export default useInput;
