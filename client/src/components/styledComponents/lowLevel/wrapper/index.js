import styled from 'styled-components';

export default styled.div`
    display: ${({disp}) => disp || 'flex'};
    ${({disp}) => disp === 'grid' ? `grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr)` : ''};
    flex-direction: ${({flexDirection}) => flexDirection || ''};
    justify-content: ${({justifyContent}) => justifyContent || 'center'};
    align-items: ${({alignItems, flexDirection}) => alignItems ? alignItems : flexDirection ? '' : 'center'};
    width: ${({w}) => w || ''};
    height: ${({h}) => h || ''};
    border: ${({border}) => border || ''};
    background-color: ${props => props.bgColor || ''};
    box-shadow: ${props => props.boxShadow || ''};
    grid-column: ${props => props.gridColumn || ''};
    font-size: ${({fontS}) => fontS || '' };
    border-left: ${({borderLeft}) => borderLeft || ''};
    border-right: ${({borderRight}) => borderRight || ''};
    border-bottom: ${({borderBottom}) => borderBottom || ''};
    border-top: ${({borderTop}) => borderTop || ''};
    margin: ${({margin}) => margin || ''};
    position: ${({position}) => position || ''};
    top: ${({top}) => top || ''};
    padding: ${({padding}) => padding || ''};
    transform: ${({transForm}) => transForm || ''};
    left: ${({left}) => left || ''};
    flex-wrap: ${({flexWrap}) => flexWrap || ''};
    max-width: ${({maxWidth}) => maxWidth || ''};
    bottom: ${({bottom}) => bottom || ''};
    min-width: ${({minWidth}) => minWidth || ''};
    min-height: ${({minHeight}) => minHeight || ''};
    color: ${({fontColor}) => fontColor || ''};
    z-index: ${({zIndex}) => zIndex || ''};
    overflow-y: ${({overflowY}) => overflowY || ''};
    overflow-x: ${({overflowX}) => overflowX || ''};
    border-radius: ${({borderRadius}) => borderRadius || ''};
    right: ${({right}) => right || ''};
    transition: transform .6s ease-in-out;

    .scroller::-webkit-scrollbar-thumb {
        width: 10px;
        background-color: #bbb;
        border-radius: 5px;
    }
    
    .scroller::-webkit-scrollbar-track {
        background: none;
    }
    
    .scroller::-webkit-scrollbar {
        width: 10px;
    }
    
    .scroller:hover {
        cursor: pointer;
    }
    
    .no-cursor:hover {
        cursor: default;
    }
`