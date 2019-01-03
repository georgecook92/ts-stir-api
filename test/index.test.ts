const add = (a: number, b: number) => a + b

const subtract = (a: number, b: number) => a - b

describe('Add', () => {
  it('should work', () => {
    const answer: number = add(1, 2)
    expect(answer).toEqual(3)
  })
})

describe('Subtract', () => {
  it('should work', () => {
    const answer: number = subtract(1, 2)
    expect(answer).toEqual(-1)
  })
})