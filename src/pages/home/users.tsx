// import { useUsers } from '../../hooks/users';
import { useUserStore } from '../../stores/users';

export default function UsersWidget() {
    // const { users, increment } = useUsers();
    const { count: users, increment } = useUserStore();

    return (
        <div>
            <h3>Usuários</h3>
            <p>{users}</p>
            <button type="button" onClick={() => increment()}>
                Add
            </button>
        </div>
    );
}
