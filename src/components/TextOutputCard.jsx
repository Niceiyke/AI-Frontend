function TextOutputCard({ output,title }) {
  return (
    <div className=" w-3/6 mx-auto bg-gray-700 text-white border border-gray-300 rounded-md p-4 mt-4 ">
      <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2>
      <p className="whitespace-pre-wrap mt-4">{output}</p>
    </div>
  );
}
export default TextOutputCard;
