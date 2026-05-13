import axios from 'axios'

// тип для одного Pydantic-error
interface PydanticError {
  loc: (string | number)[]
  msg: string
  type: string
}

export function parseApiError(error: unknown, fallback = 'Something went wrong'): string {
  if (!axios.isAxiosError(error)) {
    return fallback
  }

  const detail = error.response?.data?.detail

  // Кейс 1: detail — рядок (400)
  if (typeof detail === 'string') {
    return detail
  }

  // Кейс 2: detail — масив Pydantic-помилок (422)
  if (Array.isArray(detail)) {
    return detail
      .map((err: PydanticError) => err.msg)
      .join('\n')
  }

  return fallback
}