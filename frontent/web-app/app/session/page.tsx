import { getSession } from '../_actions/authActions';
import Heading from '../_components/Heading';
import AuthTest from './AuthTest';

const Session = async () => {
  const session = await getSession();

  return (
    <div>
      <Heading title="Session dashboard" />

      <div className="bg-blue-200 border-2 border-blue-500">
        <h3 className="text-lg">Session data</h3>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>

      <div className="mt-4">
        <AuthTest />
      </div>
    </div>
  );
};

export default Session;
