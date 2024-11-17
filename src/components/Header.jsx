import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logos/header.png";
import "../styles/Header.css";
import {
  ArrowLeft,
  Bell,
  Briefcase,
  ChevronRight,
  CircleUserRound,
  Heart,
  Mail,
  MapPin,
  Menu,
  SendHorizonal,
  X,
} from "lucide-react";
import DefaultProfilePicture from "../assets/images/default-profile-picture.png";
import BrodLogo from "../assets/logos/header.png";
import { useMediaQuery } from "react-responsive";
import {
  clientAddMessage,
  clientGetAllMessages,
  getMessagesById,
  getNotifications,
  getNotificationsNoUpdate,
  tradieGetAllMessages,
} from "../action/userActions";
import { TailSpin } from "react-loading-icons";
import dateFormat, { masks } from "dateformat";

const Header = ({ notHidden = true, headerText }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [loading, setLoading] = useState(false);
  const [inboxLoading, setInboxLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [postalCode, setPostalCode] = useState();
  const [name, setName] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [inboxSearch, setInboxSearch] = useState("");
  const [notificationsNoUpdate, setNotificationsNoUpdate] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [addMessage, setAddMessage] = useState("");
  const [onMessage, setOnMessage] = useState();

  const navigate = useNavigate();

  const divRef = useRef();

  const scrollToBottom = () => {
    const { current } = divRef;
    console.log(current);
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getNotificationsNoUpdateData = async () => {
    await getNotificationsNoUpdate(userInfo.userId).then((res) => {
      console.log(res);
      setNotificationsNoUpdate(res);
    });
  };

  const getNotificationsData = async () => {
    setLoading(true);
    await getNotifications(userInfo.userId).then((res) => {
      console.log(res);
      setNotifications(res);
      setShowNotif(!showNotif);
      setLoading(false);
    });
  };

  const getAllMessagesHandler = async () => {
    setInboxLoading(true);
    if (!isMobile) {
      setMessageLoading(true);
      if (onMessage) {
        getMessagesByIdHandler();
      } else {
        setMessageLoading(false);
      }
    }
    setShowInbox(true);
    if (userInfo.role === "Client") {
      await clientGetAllMessages(userInfo.userId).then((res) => {
        console.log(res);
        setAllMessages(res);
        setInboxLoading(false);
      });
    } else {
      await tradieGetAllMessages(userInfo.userId).then((res) => {
        console.log(res);
        setAllMessages(res);
        setInboxLoading(false);
      });
    }
  };

  const getMessagesByIdHandler = async (messageDetails) => {
    setMessageLoading(true);
    setShowMessage(true);

    if (messageDetails) {
      setOnMessage(messageDetails);
      await getMessagesById(
        messageDetails.clientId,
        messageDetails.tradieId
      ).then((res) => {
        console.log(res);

        const sortMessages = [];
        res.clientMessages.forEach((message) => {
          sortMessages.push(message);
        });
        res.tradieMessages.forEach((message) => {
          sortMessages.push(message);
        });
        sortMessages.sort((a, b) => {
          return a.timeStamp > b.timeStamp ? 1 : -1;
        });
        console.log(sortMessages);
        setMessages(sortMessages);
        setMessageLoading(false);

        const timeout = setTimeout(() => {
          scrollToBottom();
        }, 1);

        return () => clearTimeout(timeout);
      });
    } else {
      await getMessagesById(onMessage.clientId, onMessage.tradieId).then(
        (res) => {
          console.log(res);

          const sortMessages = [];
          res.clientMessages.forEach((message) => {
            sortMessages.push(message);
          });
          res.tradieMessages.forEach((message) => {
            sortMessages.push(message);
          });
          sortMessages.sort((a, b) => {
            return a.timeStamp > b.timeStamp ? 1 : -1;
          });
          console.log(sortMessages);
          setMessages(sortMessages);
          setMessageLoading(false);

          const timeout = setTimeout(() => {
            scrollToBottom();
          }, 1);

          return () => clearTimeout(timeout);
        }
      );
    }
  };

  const addMessageHandler = async (e) => {
    e.preventDefault();

    setMessageLoading(true);

    const timeStamp = new Date().toISOString();

    await clientAddMessage(
      onMessage.clientId,
      onMessage.tradieId,
      addMessage,
      timeStamp
    ).then((res) => {
      setAddMessage("");
      getMessagesByIdHandler();
    });
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setPostalCode(userInfo.postalCode);
      setProfilePicture(userInfo.profilePicture);
      getNotificationsNoUpdateData();
    }
  }, [userInfo, notifications]);

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="header">
      <header>
        {isMobile && userInfo ? (
          <div className="flex-center gap-4">
            {showMenu ? (
              <X
                color="#8C8C8C"
                className="pointer"
                onClick={() => setShowMenu(false)}
              />
            ) : (
              <Menu
                color="#8C8C8C"
                className="pointer"
                onClick={() => setShowMenu(true)}
              />
            )}
            {!showMenu && headerText ? (
              <div className="header-text">{headerText}</div>
            ) : (
              <Link
                to={
                  userInfo
                    ? userInfo.role === "Client"
                      ? "/services"
                      : userInfo.role === "Tradie"
                      ? `/tradesperson/dashboard/${userInfo.userId}`
                      : "/admin"
                    : "/"
                }
              >
                <img src={logo} className="header-logo" />
              </Link>
            )}
          </div>
        ) : (
          <Link
            to={
              userInfo
                ? userInfo.role === "Client"
                  ? "/services"
                  : userInfo.role === "Tradie"
                  ? `/tradesperson/dashboard/${userInfo.userId}`
                  : "/admin"
                : "/"
            }
          >
            <img src={logo} className="header-logo" />
          </Link>
        )}
        {userInfo
          ? userInfo.role === "Admin" ||
            (userInfo.status !== "Approved" && userInfo.role === "Tradie")
            ? !isMobile && (
                <div className="header-links">
                  <img
                    src={DefaultProfilePicture}
                    width={32}
                    height={32}
                    className="header-img"
                    onClick={() => setShowProfile(!showProfile)}
                  />
                  {showProfile &&
                    (userInfo.role === "Admin" ||
                    (userInfo.status !== "Approved" &&
                      userInfo.role === "Tradie") ? (
                      <div className="header-profile header-w-91">
                        <div className="pointer" onClick={logOutHandler}>
                          Log out
                        </div>
                      </div>
                    ) : (
                      <div className="header-profile">
                        <Link
                          to={`/profile/${userInfo.userId}`}
                          className="link-none mb-16"
                        >
                          My Account
                        </Link>
                        <div className="pointer" onClick={logOutHandler}>
                          Log out
                        </div>
                      </div>
                    ))}
                </div>
              )
            : !isMobile && (
                <div className="header-links">
                  {notificationsNoUpdate.length > 0 ? (
                    <div className="header-bell-container">
                      <Bell
                        className="pointer"
                        width={32}
                        height={32}
                        color="#8C8C8C"
                        onClick={() => {
                          if (showInbox) {
                            setShowInbox(false);
                          }
                          getNotificationsData();
                        }}
                      />
                      <span className="header-red-dot" />
                    </div>
                  ) : (
                    <Bell
                      className="pointer"
                      width={32}
                      height={32}
                      color="#8C8C8C"
                      onClick={() => {
                        if (showInbox) {
                          setShowInbox(false);
                        }
                        getNotificationsData();
                      }}
                    />
                  )}
                  <Mail
                    className="pointer"
                    width={32}
                    height={32}
                    color="#8C8C8C"
                    onClick={() => {
                      if (showNotif) {
                        setShowNotif(false);
                      }
                      getAllMessagesHandler();
                    }}
                  />
                  {userInfo.role === "Client" && (
                    <Link to={"/favorites"}>
                      <Heart
                        className="pointer"
                        width={32}
                        height={32}
                        color="#5F6368"
                      />
                    </Link>
                  )}
                  <img
                    src={
                      userInfo.profilePicture
                        ? profilePicture
                        : DefaultProfilePicture
                    }
                    width={32}
                    height={32}
                    className="header-img"
                    onClick={() => setShowProfile(!showProfile)}
                  />
                  {showProfile && (
                    <div className="header-profile">
                      <Link
                        to={`/profile/${userInfo.userId}`}
                        className="link-none block mb-16"
                      >
                        My Account
                      </Link>
                      <div className="pointer" onClick={logOutHandler}>
                        Log out
                      </div>
                    </div>
                  )}
                </div>
              )
          : notHidden && (
              <div className={"header-btns"}>
                <Link to="/login" className="login-btn">
                  Log in
                </Link>
                <span className="divider" />
                <Link to="/signup" className="signup-btn">
                  Sign Up
                </Link>
              </div>
            )}
      </header>
      {showNotif && (
        <div className="notification scroll-lock">
          {!isMobile && (
            <div className="remove-notif" onClick={() => setShowNotif(false)}>
              <X
                width={32}
                height={32}
                color="#717171"
                className="close-notif pointer"
              />
            </div>
          )}
          <div className="notif-contents">
            {isMobile ? (
              <div className="flex-center gap-8 mb-8">
                <ArrowLeft
                  color="#717171"
                  className="pointer"
                  onClick={() => setShowNotif(false)}
                />
                <h1 className="notif-h1">Notifications</h1>
              </div>
            ) : (
              <>
                <h1 className="notif-h1 mb-16">Notifications</h1>
                <div className="notif-separator mb-8" />
              </>
            )}
            {loading ? (
              <div className="loading loading-page">
                <TailSpin stroke="#1f1f23" speed={1} />
              </div>
            ) : (
              notifications &&
              notifications.map((notification) => (
                <div
                  className="notif-items flex-center mb-8"
                  key={notification._id}
                >
                  <img
                    src={
                      notification.profilePicture
                        ? notification.profilePicture
                        : DefaultProfilePicture
                    }
                    width={48}
                    height={48}
                    className="notif-item-img"
                  />
                  <div className="notif-item-text">
                    <div className="mb-4">{notification.content}</div>
                    <div className="notif-item-date">
                      {dateFormat(notification.timestamp, "mmmm d, yyyy")}
                    </div>
                  </div>
                  {/* <X
                width={16}
                height={16}
                color="#222222"
                className="pointer notif-delete"
              /> */}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {showInbox && (
        <div className="notification scroll-lock">
          {!isMobile && (
            <div className="remove-notif" onClick={() => setShowInbox(false)}>
              <X
                width={32}
                height={32}
                color="#717171"
                className="close-notif pointer"
              />
            </div>
          )}
          <div className="inbox-contents">
            {isMobile ? (
              <div className="flex-center gap-8 mb-8">
                <ArrowLeft
                  color="#717171"
                  className="pointer"
                  onClick={() => setShowInbox(false)}
                />
                <h1 className="notif-h1">Inbox</h1>
              </div>
            ) : (
              <h1 className="notif-h1 mb-14">Inbox</h1>
            )}
            {inboxLoading ? (
              <div className="loading loading-page">
                <TailSpin stroke="#1f1f23" speed={1} />
              </div>
            ) : (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log(inboxSearch);
                  }}
                >
                  <input
                    type="text"
                    className="inbox-search mb-14"
                    onChange={(e) => setInboxSearch(e.target.value)}
                    placeholder="Search"
                  />
                </form>
                {allMessages &&
                  allMessages.map((messages) => (
                    <div
                      className={
                        !isMobile && onMessage && onMessage._id === messages._id
                          ? "inbox-contents-profile pointer gray-bg"
                          : "inbox-contents-profile pointer"
                      }
                      key={messages._id}
                      onClick={() => getMessagesByIdHandler(messages)}
                    >
                      <div
                        className={
                          !isMobile &&
                          !isMobile &&
                          onMessage &&
                          onMessage._id === messages._id
                            ? "flex-center gap-8 gray-bg"
                            : "flex-center gap-8"
                        }
                      >
                        <img
                          src={
                            messages.picture
                              ? messages.picture
                              : DefaultProfilePicture
                          }
                          width={45}
                          height={45}
                          className={
                            !isMobile &&
                            onMessage &&
                            onMessage._id === messages._id
                              ? "inbox-profile-img gray-bg"
                              : "inbox-profile-img"
                          }
                        />
                        <div
                          className={
                            !isMobile &&
                            onMessage &&
                            onMessage._id === messages._id &&
                            "gray-bg"
                          }
                        >
                          <div
                            className={
                              !isMobile &&
                              onMessage &&
                              onMessage._id === messages._id
                                ? "inbox-profile-name gray-bg"
                                : "inbox-profile-name"
                            }
                          >
                            {userInfo.role === "Client"
                              ? messages.tradieName
                              : messages.clientName}
                          </div>
                          <div
                            className={
                              !isMobile &&
                              onMessage &&
                              onMessage._id === messages._id
                                ? "inbox-profile-loc flex-center gap-8 gray-bg"
                                : "inbox-profile-loc flex-center gap-8"
                            }
                          >
                            <MapPin
                              width={12.8}
                              height={16}
                              color="#8C8C8C"
                              className={
                                !isMobile &&
                                onMessage &&
                                onMessage._id === messages._id &&
                                "gray-bg"
                              }
                            />
                            {userInfo.role === "Client"
                              ? messages.tradielocation
                              : messages.clientlocation}
                          </div>{" "}
                        </div>
                      </div>
                      <ChevronRight
                        color="#8C8C8C"
                        className={
                          !isMobile &&
                          onMessage &&
                          onMessage._id === messages._id &&
                          "gray-bg"
                        }
                      />
                    </div>
                  ))}
              </>
            )}
          </div>
          <div
            className={
              isMobile && showMessage
                ? "inbox-message-mobile gray-bg"
                : "inbox-message-container gray-bg"
            }
          >
            {messageLoading ? (
              <div
                className={
                  isMobile
                    ? "loading loading-page gray-bg"
                    : "inbox-message-container loading-page gray-bg"
                }
              >
                <TailSpin stroke="#1f1f23" speed={1} className="gray-bg" />
              </div>
            ) : (
              showMessage && (
                <div
                  className={
                    isMobile
                      ? "inbox-message-mobile gray-bg"
                      : "inbox-message-container gray-bg"
                  }
                >
                  <div className="inbox-message-mobile-container gray-bg">
                    {isMobile ? (
                      <div className="flex-center gap-12 gray-bg">
                        <ArrowLeft
                          color="#717171"
                          className="pointer gray-bg"
                          onClick={() => {
                            setShowMessage(false);
                          }}
                        />
                        <div className="mb-16 gray-bg">
                          <div className="flex-center gap-8 gray-bg">
                            <img
                              src={
                                onMessage.picture
                                  ? onMessage.picture
                                  : DefaultProfilePicture
                              }
                              width={45}
                              height={45}
                              className="inbox-profile-img gray-bg"
                            />
                            <div className="gray-bg">
                              <div className="inbox-profile-name gray-bg">
                                {userInfo.role === "Client"
                                  ? onMessage.tradieName
                                  : onMessage.clientName}
                              </div>
                              <div className="inbox-profile-loc flex-center gap-8 gray-bg">
                                <MapPin
                                  width={12.8}
                                  height={16}
                                  color="#8C8C8C"
                                  className="gray-bg"
                                />
                                {userInfo.role === "Client"
                                  ? onMessage.tradielocation
                                  : onMessage.clientlocation}
                              </div>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-16 gray-bg">
                        <div className="flex-center gap-8 gray-bg">
                          <img
                            src={
                              onMessage.picture
                                ? onMessage.picture
                                : DefaultProfilePicture
                            }
                            width={45}
                            height={45}
                            className="inbox-profile-img gray-bg"
                          />
                          <div className="gray-bg">
                            <div className="inbox-profile-name gray-bg">
                              {userInfo.role === "Client"
                                ? onMessage.tradieName
                                : onMessage.clientName}
                            </div>
                            <div className="inbox-profile-loc flex-center gap-8 gray-bg">
                              <MapPin
                                width={12.8}
                                height={16}
                                color="#8C8C8C"
                                className="gray-bg"
                              />
                              {userInfo.role === "Client"
                                ? onMessage.tradielocation
                                : onMessage.clientlocation}
                            </div>{" "}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="inbox-messages gray-bg">
                      {messages &&
                        messages.map((message) => (
                          <div
                            className={
                              message.sentByClient
                                ? "inbox-message-user mb-16 gray-bg"
                                : "mb-16 gray-bg"
                            }
                            key={message._id}
                          >
                            <div className="inbox-message-date mb-4 gray-bg">
                              {dateFormat(message.timeStamp, "mmmm dd, yyyy")} |{" "}
                              {dateFormat(message.timeStamp, "h:MM TT")}
                            </div>
                            <span className="inbox-message">
                              {message.message}
                            </span>
                          </div>
                        ))}
                      <div ref={divRef} />
                    </div>
                    <form
                      onSubmit={addMessageHandler}
                      className="inbox-message-input-container gray-bg"
                    >
                      <input
                        type="text"
                        className="inbox-message-input"
                        placeholder="Type something..."
                        value={addMessage}
                        onChange={(e) => setAddMessage(e.target.value)}
                      />
                      <SendHorizonal
                        width={35.56}
                        height={40}
                        color="#1F1F23"
                        className="inbox-message-send pointer"
                      />
                    </form>
                  </div>
                </div>
              )
            )}

            {/* {showMessage && (
              <div className="inbox-message-mobile-container gray-bg">
                {isMobile ? (
                  <div className="flex-center gap-12 gray-bg">
                    <ArrowLeft
                      color="#717171"
                      className="pointer gray-bg"
                      onClick={() => {
                        setShowInbox(true);
                        setShowMessage(false);
                      }}
                    />
                    <div className="mb-16 gray-bg">
                      <div className="flex-center gap-8 gray-bg">
                        <img
                          src={DefaultProfilePicture}
                          width={45}
                          height={45}
                          className="inbox-profile-img gray-bg"
                        />
                        <div className="gray-bg">
                          <div className="inbox-profile-name gray-bg">Name</div>
                          <div className="inbox-profile-loc flex-center gap-8 gray-bg">
                            <MapPin
                              width={12.8}
                              height={16}
                              color="#8C8C8C"
                              className="gray-bg"
                            />
                            Location
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-16 gray-bg">
                    <div className="flex-center gap-8 gray-bg">
                      <img
                        src={DefaultProfilePicture}
                        width={45}
                        height={45}
                        className="inbox-profile-img gray-bg"
                      />
                      <div className="gray-bg">
                        <div className="inbox-profile-name gray-bg">Name</div>
                        <div className="inbox-profile-loc flex-center gap-8 gray-bg">
                          <MapPin
                            width={12.8}
                            height={16}
                            color="#8C8C8C"
                            className="gray-bg"
                          />
                          Location
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                )}
                <div className="inbox-messages gray-bg">
                  <div className="inbox-message-user mb-16 gray-bg">
                    <div className="inbox-message-date mb-4 gray-bg">
                      May 24, 2024 | 9:00 AM
                    </div>
                    <span className="inbox-message">
                      Hi Yves, I would like to follow up on my inquiry about
                      house painting.
                    </span>
                  </div>
                  <div className="inbox-message-user mb-16 gray-bg">
                    <div className="inbox-message-date mb-4 gray-bg">
                      May 24, 2024 | 9:00 AM
                    </div>
                    <span className="inbox-message">
                      Hi Yves, I would like to follow up on my inquiry about
                      house painting.
                    </span>
                  </div>
                  <div className="inbox-message-user mb-16 gray-bg">
                    <div className="inbox-message-date mb-4 gray-bg">
                      May 24, 2024 | 9:00 AM
                    </div>
                    <span className="inbox-message">
                      Hi Yves, I would like to follow up on my inquiry about
                      house painting.
                    </span>
                  </div>
                  <div className="inbox-message-user mb-16 gray-bg">
                    <div className="inbox-message-date mb-4 gray-bg">
                      May 24, 2024 | 9:00 AM
                    </div>
                    <span className="inbox-message">
                      Hi Yves, I would like to follow up on my inquiry about
                      house painting.
                    </span>
                  </div>
                  <div className="inbox-message-user mb-16 gray-bg">
                    <div className="inbox-message-date mb-4 gray-bg">
                      May 24, 2024 | 9:00 AM
                    </div>
                    <span className="inbox-message">
                      Hi Yves, I would like to follow up on my inquiry about
                      house painting.
                    </span>
                  </div>
                  <div className="inbox-message-user mb-16 gray-bg">
                    <div className="inbox-message-date mb-4 gray-bg">
                      May 24, 2024 | 9:00 AM
                    </div>
                    <span className="inbox-message">
                      Hi Yves, I would like to follow up on my inquiry about
                      house painting.
                    </span>
                  </div>
                  <div className="inbox-message-user mb-16 gray-bg">
                    <div className="inbox-message-date mb-4 gray-bg">
                      May 24, 2024 | 9:00 AM
                    </div>
                    <span className="inbox-message">
                      Hi Yves, I would like to follow up on my inquiry about
                      house painting.
                    </span>
                  </div>
                  <div className="inbox-message-user mb-16 gray-bg">
                    <div className="inbox-message-date mb-4 gray-bg">
                      May 24, 2024 | 9:00 AM
                    </div>
                    <span className="inbox-message">
                      Hi Yves, I would like to follow up on my inquiry about
                      house painting.
                    </span>
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("first");
                  }}
                  className="inbox-message-input-container gray-bg"
                >
                  <input
                    type="text"
                    className="inbox-message-input"
                    placeholder="Type something..."
                  />
                  <SendHorizonal
                    width={35.56}
                    height={40}
                    color="#1F1F23"
                    className="inbox-message-send pointer"
                  />
                </form>
              </div>
            )} */}
          </div>
        </div>
      )}

      {showMenu && isMobile && (
        <div className="header-menu-container scroll-lock">
          <div className="header-menu">
            <div className="flex-center gap-16 mb-24">
              <img
                src={
                  userInfo.profilePicture
                    ? profilePicture
                    : DefaultProfilePicture
                }
                width={60}
                height={60}
                className="header-img"
              />
              {userInfo.role === "Admin" ? (
                <div className="header-name">Admin</div>
              ) : (
                <div>
                  <div className="header-name mb-4">{name}</div>
                  <div className="header-loc flex-center gap-8">
                    <MapPin width={20} height={20} color="#8C8C8C" />
                    {postalCode}
                  </div>
                </div>
              )}
            </div>
            {userInfo.role !== "Admin" && (
              <div className="mb-24">
                <Link
                  to={`/profile/${userInfo.userId}`}
                  className="link-none flex-center gap-12 mb-16"
                >
                  <CircleUserRound color="#8C8C8C" />
                  My Account
                </Link>
                {userInfo.role === "Client" ? (
                  <Link
                    to={"/favorites"}
                    className="link-none flex-center gap-12 mb-16"
                  >
                    <Heart color="#8C8C8C" />
                    My Favorites
                  </Link>
                ) : (
                  <Link
                    to={`/profile/${userInfo.userId}/job-ads`}
                    className="link-none flex-center gap-12 mb-16"
                  >
                    <Briefcase color="#8C8C8C" />
                    My Job Ads
                  </Link>
                )}
                <div
                  className="flex-center gap-12 mb-16 pointer"
                  onClick={() => {
                    setShowMessage(false);
                    getAllMessagesHandler();
                  }}
                >
                  <Mail color="#8C8C8C" />
                  Inbox
                </div>
                {notificationsNoUpdate.length > 0 ? (
                  <div
                    className="header-bell-container flex-center gap-12 pointer"
                    onClick={() => getNotificationsData()}
                  >
                    <Bell color="#8C8C8C" />
                    Notifications
                    <span className="header-red-dot" />
                  </div>
                ) : (
                  <div
                    className="flex-center gap-12 pointer"
                    onClick={() => getNotificationsData()}
                  >
                    <Bell color="#8C8C8C" />
                    Notifications
                  </div>
                )}
              </div>
            )}
            <div className="header-line mb-24"></div>
            <div className="pointer" onClick={logOutHandler}>
              Log out
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
