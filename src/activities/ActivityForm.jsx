import useMutation from "../api/useMutation"

export default function ActivityForm() {
    const {
        mutate: add, loading, error
    } = useMutation("POST", "/activities", ["activities"]);
        const addActivity = (FormData) => {
            const name = FormData.get("name");
            const description = FormData.get("description")
            add({ name, description })
        };

        return(
            <>
            <h2>Add Something New!</h2>
            <form action={addActivity}>
                <label>
                    Name 
                    <input type="text" name="name" />
                </label>
                <label>
                    Description
                    <input type="text" name="description" />
                </label>
                <button>{loading ? "Adding..." : "Add Activity"}</button>
                {error && <output>{error}</output>}
            </form>
            </>
        )
}