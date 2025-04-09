import { render } from "@testing-library/react";
import TestPage from "../pages/test";
it("renders homepage unchanged", () => {
  const { container } = render(<TestPage />);
  expect(container).toMatchSnapshot();
});
