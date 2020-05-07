import styled from 'styled-components';

export default styled.button`
    background-color: ${({bgColor}) => bgColor || 'rgba(230,225,33,.9)'};
    width: ${({w}) => w || '125px'};
    height: ${({h}) => h || '125px'};
    color: ${({fontColor}) => fontColor || '#000'};
    border-radius: ${({borderRadius}) => borderRadius || '7px'};
    box-shadow: ${({boxShadow}) => boxShadow || '#444 7px 5px 15px'};
    border: ${({border}) => border || 'none'};
    font-size: ${({fontS}) => fontS || '30px'};
    font-weight: ${({fontW}) => fontW || ''};
    justify-content: ${({justifyContent}) => justifyContent || ''};
    display: ${({disp}) => disp || ''};
    padding: ${({padding}) => padding || '5px'};
    margin: ${({margin}) => margin || '10px'};
    text-align: ${({textAlign}) => textAlign || 'center'};
    border-bottom: ${({borderBottom}) => borderBottom || ''};
    border-top: ${({borderTop}) => borderTop || ''};
    border-left: ${({borderLeft}) => borderLeft || ''};
    border-right: ${({borderRight}) => borderRight || ''};
    position: ${({position}) => position || ''};
    bottom: ${({bottom}) => bottom || ''};
    border-color: ${({borderColor}) => borderColor || ''};
    max-width: ${({maxWidth}) => maxWidth || ''};
    align-items: ${({alignItems}) => alignItems || ''};
    left: ${({left}) => left || ''};
    transform: ${({trans}) => trans || ''};
    top: ${({top}) => top || ''};
    flex-direction: ${({flexDirection}) => flexDirection || ''};
    right: ${({right}) => right || ''};

    &:focus {
        outline: none;
    }
    
    ${({noCursor}) => noCursor ? '' :
        `&:hover {
            cursor: pointer;
        }`
    }
`;