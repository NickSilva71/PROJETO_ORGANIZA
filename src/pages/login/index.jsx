export default function Login() {
  return (
    <div className="flex mt-12 flex-col gap-8 font-medium text-2xl">
      <h1 className="p-6 max-w-md mx-auto border-r-2 border-b-2 border-teal-600 bg-teal-100 rounded-xl shadow-lg">
        Pagina de Login
      </h1>
      <div className="p-6 max-w-lg mx-auto border-r-2 border-b-2 border-teal-600 bg-teal-100 rounded-xl shadow-lg flex flex-col text-center gap-8">
        <h2>Documentação de metodo de autenticação</h2>
        <a
          href="https://nextjs.org/docs/pages/building-your-application/routing/redirecting#nextresponseredirect-in-middleware"
          className="text-sky-500 after:content-['_↗']"
        >
          Redireciona para<code>/login</code> caso não esteja logado
        </a>
        <a
          className="text-red-700 font-bold font after:content-['_↗']"
          href="https://nextjs.org/docs/app/building-your-application/routing/middleware"
        >
          middleware
        </a>
      </div>
    </div>
  );
}
