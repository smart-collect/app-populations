import { fireEvent, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { PasswordInput } from "./PasswordInput";

function PasswordInputForm({ onSubmit }: { onSubmit: (values: { password: string }) => void }) {
  const { register, handleSubmit } = useForm<{ password: string }>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="password">Mot de passe</label>
      <PasswordInput id="password" {...register("password")} />
      <button type="submit">Envoyer</button>
    </form>
  );
}

describe("PasswordInput", () => {
  it("forward refs so react-hook-form can register the input and submit the value", async () => {
    const handleSubmit = vi.fn();

    render(<PasswordInputForm onSubmit={handleSubmit} />);

    const passwordField = screen.getByLabelText("Mot de passe") as HTMLInputElement;
    fireEvent.input(passwordField, { target: { value: "Test@1234" } });
    fireEvent.submit(screen.getByRole("button", { name: /envoyer/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({ password: "Test@1234" }, expect.anything());
  });

  it("toggles visibility when the eye button is clicked", () => {
    render(
      <PasswordInput
        id="password"
        aria-label="Mot de passe"
        placeholder="Mot de passe"
      />
    );

    const toggleButton = screen.getByRole("button", { name: /afficher le mot de passe/i });
    const passwordField = screen.getByLabelText(/mot de passe/i) as HTMLInputElement;

    expect(passwordField.type).toBe("password");

    fireEvent.click(toggleButton);
    expect(passwordField.type).toBe("text");

    fireEvent.click(toggleButton);
    expect(passwordField.type).toBe("password");
  });
});
