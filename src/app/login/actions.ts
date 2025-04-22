"use server";

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const password = formData.get("password");

  console.log(formData);

  if (password === '12345') {
    return {
      message: 'Welcome back!',
      type: 'success',
    };
  } else {
    return {
      message: '',
      type: 'error',
      errors: { password: ['Wrong password'] }
    }
  }
}