import Add from './AddChannel.jsx';
import Remove from './RemoveChannel.jsx';
import Rename from './RenameChannel.jsx';

const modals = {
  addChannel: Add,
  removing: Remove,
  renaming: Rename,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (modalName) => modals[modalName];
