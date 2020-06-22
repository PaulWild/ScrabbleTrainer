interface ApplicatonConfiguration {
    ApiHost: string
}

let Configuration: ApplicatonConfiguration

if (process.env.NODE_ENV === "production"){
    Configuration = {
        ApiHost: "https://scrabble.paulwild.dev"
    }
} else {
    Configuration = {
        ApiHost: "http://localhost:7071"
    }
}

export default Configuration
