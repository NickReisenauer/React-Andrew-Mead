import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("Should setup remove expense action object", () => {
  const action = removeExpense({ id: "123ABC" });
  expect(action).toEqual({ type: "REMOVE_EXPENSE", id: "123ABC" });
});

test("Should edit an expense", () => {
  const action = editExpense("123ABC", { note: "New Note Value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123ABC",
    updates: {
      note: "New Note Value",
    },
  });
});

test("Should set up add expense action object with provided values", () => {
  const expenseData = {
    description: "Rent",
    amount: 109500,
    createdAt: 1000,
    note: "This was last months rent",
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String),
    },
  });
});

test("Should set up add expense action object with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
    },
  });
});
