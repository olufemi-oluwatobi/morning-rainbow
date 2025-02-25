export function MissingTokenMessage() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Missing Token</h2>
      <p className="text-gray-400">
        Please add the <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">LINEAR_API_TOKEN</code>{" "}
        environment variable to your v0 project to see your minimal Linear task list
      </p>
    </div>
  )
}

