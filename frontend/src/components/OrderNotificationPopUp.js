import styled from "styled-components";

const Notification = styled.aside`
  display: ${(props) => (props.notificationCount !== 0 ? "fixed" : "none")};
  position: absolute;
  top: 58px;
  left: 50%;
  transform: translateX(-50%);
  min-width: max-content;

  background: ${(props) => props.theme.darkYellow};
  border-radius: 5px;
  padding: 8px 15px 10px;

  box-shadow: ${(props) => props.theme.lightBoxShadow};
  z-index: 1000;
  & > div {
    display: flex;
    gap: 15px;
    align-items: center;
    & > p {
      color: white;
      font-weight: 900;
    }
    & > button {
      padding: 0 5px 1px;
      color: #fff;
      background: #e83c2e;
      cursor: pointer;
      border-radius: 5px;
    }
  }
`;

export default function OrderNotificationPopUp({
  notificationCount,
  message,
  close,
}) {
  return (
    <Notification notificationCount={notificationCount}>
      <div>
        <p>{message}</p>
        <button onClick={close}>x</button>
      </div>
    </Notification>
  );
}
