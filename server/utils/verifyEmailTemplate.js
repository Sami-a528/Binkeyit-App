const verifyEmailTemplate = ({name, url}) => {
    return `
        <p>Dear ${name}</p>
        <p>Thank You registering in Binkeyit.</p>
        <a href=${url} style="color : margin-top : 10px; padding : 20px; text-decoration : none; display: block"; >
        Verify Email
        </a>
    `
};
export default verifyEmailTemplate;