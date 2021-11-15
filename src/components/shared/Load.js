import styled from "styled-components";
import Loader from "react-loader-spinner";

export default function Load() {
    return (
        <Wrapper>
            <Loader type="Rings" color="#3EA4C4" width="50vw" height="50vh" />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    z-index: 3;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;