//import Head from "next/head";
// import { useRouter } from "next/navigation";
'use client';
import { useSearchParams } from 'next/navigation';



function Validate() {
    // Access param1 and param2 here
    //console.log("query: ", username, password)
    //const paramsdata = `Param1: ${username}, Param2: ${password}`;

		// const router = useRouter()
		// console.log(router)
		const s = useSearchParams()
		const username = s.get('username')
		const password = s.get('password')
		console.log(username, password)
    return (
        <>
{/*            <Head>
                <title>Create Next App</title>
            </Head>*/}
            <main style={{ height: "100vh" }}>
                {/* <p>{paramsdata}</p> */}
            </main>
        </>
    );
}

Validate.getInitialProps = async ({ username, password }) => {
		console.log("query: ", username, password)
    // Access query parameters from query object
    //const { username, password } = query;
    
    // Fetch data based on query parameters
    // Return data as props
    return { username, password };
};

export default Validate