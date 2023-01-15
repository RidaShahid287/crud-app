import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Grid, Button, Card, Container, Image, Item } from "semantic-ui-react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router";
import { ModalComp } from "../components/ModalComp";
import "./style.css";
import { Spinner } from "../components/Spinner";

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState({}) //single user for modal componenet
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
/*   const userData = async () => {
 const userdata = await db.getUserById(users)
    navigate(`/update/${users.id}`)
  } */
const handleModal = (item) => {
  setOpen(true)
  setUser(item)
}
const handleDelete = async (id) => {
  if(window.confirm('Are you sure to delete that user?')){
    try{
      setOpen(false)
      await deleteDoc(doc(db, 'users', id))
      setUsers(users.filter((user) => user.id !== id))
    }catch(err){
   console.log(err)
    }
  }


}
  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  if(loading){
    return <Spinner />
  }

  return (
    <Container>
        <Grid columns={3} stackable>
          {users &&
            users.map((item) => (
              <Grid.Column id="card-top" key={item.id}>
                <Card >
                  <Card.Content>
                    <Image
                      src={item.img}
                      size="medium"
                      style={{
                        height: "150px",
                        width: "150px",
                        borderRadius: "50%",
                      }}
                    />
                    <Card.Header style={{ marginTop: "10px" }}>
                      {item.name}
                    </Card.Header>
                    <Card.Description> {item.info} </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div>
                      <Button
                        color="green"
                         onClick={() => navigate(`/update/${item.id}`)}
                      >
                        Update
                      </Button>
                      <Button color="purple" onClick={() => handleModal(item)}>View</Button>
                      {open && <ModalComp
                             open = {open}
                             setOpen = {setOpen}
                             handleDelete = {(handleDelete)}
                             {...user}
                      ></ModalComp>
                      }
                    </div>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
        </Grid>
    </Container>
  );
};
