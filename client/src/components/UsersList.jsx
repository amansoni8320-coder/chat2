import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatBubble from "../assets/chat-bubble.png";
const UsersList = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    const getUserName = async () => {
      const data = await JSON.parse(localStorage.getItem("chat-app-user"));
      setCurrentUserName(data?.username);
      setCurrentUserImage(data?.avatarImage);
    };
    getUserName();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className='brand'>
            <img src={ChatBubble} alt='logo' />
            <h3>ChatChit</h3>
          </div>
          <div className='contacts'>
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""}`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className='avatar'>
                    <img src={`data:image/svg+xml;base64,${contact?.avatarImage}`} alt='' />
                  </div>
                  <div className='username'>
                    <h3>{contact?.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='current-user'>
            <div className='avatar'>
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt='avatar' />
            </div>
            <div className='username'>
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};
export default UsersList;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color:# ;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: #ffffff; 
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #3E3BA8 ; 
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0 2rem 2rem 0;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #ffffff;
        }
      }
    }
    .selected {
      background-color: #4e0eff; 
    }
  }

  .current-user {
    background-color: #292079; 
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: #ffffff;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
