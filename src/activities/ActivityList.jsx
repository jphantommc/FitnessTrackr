import { useAuth } from "../auth/AuthContext"
import useQuery from "../api/useQuery"
import useMutation from "../api/useMutation"

export default function ActivityList() {
    const {
        data: activities, loading, error,
    } = useQuery("/activites", "activites");

    if (loading || !activities) return <p>Loading...</p>;
    if (error) return <p> No can do Buckoru {error}</p>;

    return (
        <ul>
            {activities.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
            ))}
        </ul>
    )
}

function ActivityListItem({ activity }) {
    const { token } = useAuth();
    const {
        mutate:  deleteActivity, loading, error,
    } = useMutation("DELETE", "/activites" + activity.id, ["activities"])

        return (
            <li>
                <p>{activity.name}</p>
                { token && (
                    <button onClick={() => deleteActivity()}>
                        {loading ? "Deleting" : error ? error : "Delete"}
                    </button>
                )}
            </li>
        )
}