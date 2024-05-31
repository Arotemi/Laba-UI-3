import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import Modal from 'react-native-modal';
import EditContactModal from '../../components/EditContactModal';
import CreateContactModal from '../../components/CreateContactModal';
import LinearGradient from "react-native-linear-gradient";

// const HomeAccountScreen = () => {
//     const [contacts, setContacts]                         = useState([]);
//     const [currentContact, setCurrentContact]             = useState(null);
//     const [isModalVisible, setIsModalVisible]             = useState(false);
//     const [isShareModalVisible, setIsShareModalVisible]   = useState(false);
//     const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
//     const [contact, setContact]                           = useState({});
//     const [queryParams, setQueryParams] = useState({ search: '', sortBy: 'createdAt', orderBy: 'DESC' });
//
//     useEffect(() => {
//         fetchData();
//     }, [queryParams]);
//
//     async function fetchData() {
//         const response = await fetch('http://192.168.0.120:8080/apiv1/users', {
//             method: 'get',
//             headers: {'Content-Type': 'application/json' }
//         });
//         const contactsData = await response.json();
//         setContacts(contactsData);
//     }
//
//     async function handleUpdate(data) {
//         await fetch(`http://10.0.2.2:8080/v1/contacts/${data.id}`, {
//             method: 'patch',
//             headers: {'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });
//         setIsModalVisible(false);
//         fetchData();
//     }
//
//     async function handleCreate(data) {
//         await fetch(`http://10.0.2.2:8080/v1/contacts`, {
//             method: 'post',
//             headers: {'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });
//         setIsCreateModalVisible(false);
//         fetchData();
//     }
//
//     async function handleDelete(id) {
//         await fetch(`http://10.0.2.2:8080/v1/contacts/${id}`, {
//             method: 'delete',
//             headers: {'Content-Type': 'application/json' }
//         });
//         fetchData();
//     }
//
//     async function handleShare(id) {
//         setCurrentContact(id);
//         setIsShareModalVisible(true);
//     }
//
//     async function handleShareContact(userId) {
//         await api.contacts.share(currentContact, { userId });
//         setIsShareModalVisible(false);
//     }
//
//     const renderItem = ({ item }) => (
//         <ListItem bottomDivider>
//         <ListItem.Content>
//             <ListItem.Title>{item.firstName}</ListItem.Title>
//             <ListItem.Subtitle>{item.lastName}</ListItem.Subtitle>
//             <ListItem.Subtitle>{item.phone}</ListItem.Subtitle>
//         </ListItem.Content>
//         <Button title="Edit" onPress={() => { setContact(item); setIsModalVisible(true); }} />
//         <Button title="Delete" onPress={() => handleDelete(item.id)} />
//         <Button title="Share" onPress={() => handleShare(item.id)} />
//         </ListItem>
//     );
//
//     return (
//         <View style={styles.container}>
//         <View style={styles.header}>
//             <Text style={styles.title}>Managing Contacts</Text>
//             <Button title="Create" onPress={() => setIsCreateModalVisible(true)} />
//         </View>
//         <TextInput
//             style={styles.input}
//             value={queryParams.search}
//             onChangeText={(text) => setQueryParams((prev) => ({ ...prev, search: text }))}
//             placeholder="Search"
//         />
//         <FlatList
//             data={contacts}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//         />
//
//         <EditContactModal isOpen={isModalVisible} onOk={handleUpdate} onClose={() => setIsModalVisible(false)} contactData={contact}  />
//         <CreateContactModal isOpen={isCreateModalVisible} onOk={handleCreate} onClose={() => setIsCreateModalVisible(false)} />
//
//         <Modal isVisible={isShareModalVisible} onBackdropPress={() => setIsShareModalVisible(false)}>
//             {/* Your ShareModal content here */}
//             <View style={styles.modalContent}>
//             <Text>Share Contact</Text>
//             {/* Add your form fields here */}
//             <Button title="Share" onPress={() => handleShareContact(contact.id)} />
//             <Button title="Cancel" onPress={() => setIsShareModalVisible(false)} />
//             </View>
//         </Modal>
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//   },
// });
//
//
// export default HomeAccountScreen


const HomeAccountScreen = () => {
    const [contacts, setContacts]                         = useState([]);
    const [currentContact, setCurrentContact]             = useState(null);
    const [isModalVisible, setIsModalVisible]             = useState(false);
    const [isShareModalVisible, setIsShareModalVisible]   = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [contact, setContact]                           = useState({});
    const [queryParams, setQueryParams] = useState({ search: '', sortBy: 'createdAt', orderBy: 'DESC' });

    useEffect(() => {
        fetchData();
    }, [queryParams]);

    async function fetchData() {
        const response = await fetch('http://192.168.0.120:8080/apiv1/users', {
            method: 'get',
            headers: {'Content-Type': 'application/json' }
        });
        const contactsData = await response.json();
        setContacts(contactsData);
    }

    async function handleUpdate(data) {
        await fetch(`http://192.168.0.120:8080/apiv1/users/${data.id}`, {
            method: 'patch',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        setIsModalVisible(false);
        fetchData();
    }

    async function handleCreate(data) {
        await fetch(`http://192.168.0.120:8080/apiv1/users`, {
            method: 'post',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        setIsCreateModalVisible(false);
        fetchData();
    }

    async function handleDelete(id) {
        await fetch(`http://192.168.0.120:8080/apiv1/users/${id}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json' }
        });
        fetchData();
    }

    async function handleShare(id) {
        setCurrentContact(id);
        setIsShareModalVisible(true);
    }

    async function handleShareContact(userId) {
        await api.contacts.share(currentContact, { userId });
        setIsShareModalVisible(false);
    }

    const renderItem = ({ item }) => (
        <ListItem containerStyle={styles.listItem} bottomDivider>
            <ListItem.Content>
                <ListItem.Title style={styles.listItemTitle}>{item.firstName}</ListItem.Title>
                <ListItem.Subtitle style={styles.listItemSubtitle}>{item.lastName}</ListItem.Subtitle>
                <ListItem.Subtitle style={styles.listItemSubtitle}>{item.phone}</ListItem.Subtitle>
            </ListItem.Content>
            <View style={styles.buttonGroup}>
                <LinearGradient colors={['#FF8008', '#FFC837']} style={styles.button}>
                    <TouchableOpacity onPress={() => { setContact(item); setIsModalVisible(true); }}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={['#FF8008', '#FFC837']} style={styles.button}>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={['#FF8008', '#FFC837']} style={styles.button}>
                    <TouchableOpacity onPress={() => handleShare(item.id)}>
                        <Text style={styles.buttonText}>Share</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

        </ListItem>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Contact Users List</Text>

            </View>

            <View style={styles.buttonContainer}>
                <LinearGradient colors={['#e63922', '#885201']} style={styles.headerButton}>
                    <TouchableOpacity onPress={() => setIsCreateModalVisible(true)}>
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={['#3bb9f4', '#0a3cb3']} style={styles.headerButton}>
                    <TouchableOpacity onPress={() => { /* Handle Shared Users */ }}>
                        <Text style={styles.buttonText}>Shared Users</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            {/*<TextInput*/}
            {/*    style={styles.input}*/}
            {/*    value={queryParams.search}*/}
            {/*    onChangeText={(text) => setQueryParams((prev) => ({ ...prev, search: text }))}*/}
            {/*    placeholder="Search"*/}
            {/*/>*/}
            <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />

            <EditContactModal isOpen={isModalVisible} onOk={handleUpdate} onClose={() => setIsModalVisible(false)} contactData={contact} />
            <CreateContactModal isOpen={isCreateModalVisible} onOk={handleCreate} onClose={() => setIsCreateModalVisible(false)} />

            <Modal isVisible={isShareModalVisible} onBackdropPress={() => setIsShareModalVisible(false)}>
                {/* Your ShareModal content here */}
                <View style={styles.modalContent}>
                    <Text>Share Contact</Text>
                    {/* Add your form fields here */}
                    <Button title="Share" onPress={() => handleShareContact(contact.id)} />
                    <Button title="Cancel" onPress={() => setIsShareModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFA500', // Orange background color
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF', // White color for better contrast
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom:15,
        paddingLeft: 150,
    },
    headerButton: {
        marginLeft: 10,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
    listItem: {
        backgroundColor: '#FFEBCC', // Light orange background color
    },
    listItemTitle: {
        fontWeight: 'bold',
        color: '#333333', // Dark color for better readability
    },
    listItemSubtitle: {
        color: '#666666', // Gray color for subtitles
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginLeft: 10,
        padding: 10,
        borderRadius: 5,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default HomeAccountScreen