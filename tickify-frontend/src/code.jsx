// check code

//  useEffect(() => {
//         setIsLoading(true);
//         axios.get(`http://localhost:8000/api/admin/events?page=${page}`, {
//             headers: {
//                 'Authorization': `Bearer ${token?.token}`,
//             },
//         })
//             .then(response => {
//                 setEvents(response.data?.events);
//                 setIsLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching events:', error);
//                 setIsLoading(false);
//             });
//     }, []);