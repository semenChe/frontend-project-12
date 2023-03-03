import { Button, Nav } from 'react-bootstrap';
import { BsPlusSquare } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const ChannelsComponent = () => {
  const channelsInfo = useSelector((s) => s.channelsInfo);
  // console.log('channelsInfo:', channelsInfo);

  const openAddChannelWindow = () => {};
  const handleClick = (id) => { console.log(id); };

  const { currentChannelId } = channelsInfo;

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <Button
          variant="light"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={openAddChannelWindow}
        >
          <BsPlusSquare />
        </Button>
      </div>
      <Nav
        defaultActiveKey="#general"
        className="flex-column nav-pills nav-fill px-2"
        as="ul"
      >
        {channelsInfo.channels.map((channel) => (
          <Nav.Item key={channel.id} className="w-100" as="li">
            <Button
              variant={channel.id === currentChannelId ? 'secondary' : 'light'}
              className="w-100 rounded-0 text-start"
              onClick={() => handleClick(channel.id)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default ChannelsComponent;
