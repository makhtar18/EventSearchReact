import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ShowMoreText from "react-show-more-text";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import PopUpModal from "./PopUpModal";

//truncatedEndingComponent={"... "}
const VenueTab = (props)=>{
    return (
    <div>
      <div className="row">
            <div className="col-12 col-sm" style={{margin:"1rem auto auto auto"}}>
                {(props.venueResponse.name!='' && props.venueResponse.name!=undefined)&&(<div style={{textAlign:"center"}}>
                    <h5 style={{color:"rgb(115, 241, 222)", fontWeight:"600"}}>Name</h5>
                    <h6 style={{color:"white", fontWeight:"500"}}>{props.venueResponse.name}</h6>
                </div>)}
                {(props.venueResponse.showAddress) && (<div className="mt-3" style={{textAlign:"center"}}>
                    <h5 style={{color:"rgb(115, 241, 222)", fontWeight:"600"}}>Address</h5>
                    <h6 style={{color:"white", fontWeight:"500"}}>{props.venueResponse.address}</h6>
                </div>)}
                {(props.venueResponse.showPhoneNumber) && (<div className="mt-3" style={{textAlign:"center"}}>
                    <h5 style={{color:"rgb(115, 241, 222)", fontWeight:"600"}}>Phone Number</h5>
                    <h6 style={{color:"white", fontWeight:"500"}}>{props.venueResponse.phoneNumber}</h6>
                </div>)}
            </div>
            <div className="col-12 col-sm" style={{margin:"auto"}}>
                {(props.venueResponse.showOpenHours) && (<div className="mt-3" style={{textAlign:"center"}}>
                    <h5 style={{color:"rgb(115, 241, 222)", fontWeight:"600"}}>Open Hours</h5>
                    <ShowMoreText
                        lines={2}
                        more={["Show more", <FaAngleDown color="white"/>]}
                        less={["Show less", <FaAngleUp color="white"/>]}
                        className="content-css"
                        anchorClass="show-more-less-clickable"
                        expanded={false}
                        truncatedEndingComponent={""}
                        >{props.venueResponse.openHours}</ShowMoreText>
                </div>)}
                {(props.venueResponse.showGeneralRule) && (<div className="mt-3" style={{textAlign:"center"}}>
                    <h5 style={{color:"rgb(115, 241, 222)", fontWeight:"600"}}>General Rule</h5>
                    <ShowMoreText
                        lines={2}
                        more={["Show more", <FaAngleDown color="white"/>]}
                        less={["Show less", <FaAngleUp color="white"/>]}
                        className="content-css generalRule"
                        anchorClass="show-more-less-clickable"
                        expanded={false}
                        truncatedEndingComponent={""}
                        >{props.venueResponse.generalRule}</ShowMoreText>
                </div>)}
                {(props.venueResponse.showChildRule) && (<div className="mt-3" style={{textAlign:"center"}}>
                    <h5 style={{color:"rgb(115, 241, 222)", fontWeight:"600"}}>Child Rule</h5>
                    <ShowMoreText
                        lines={2}
                        more={["Show more", <FaAngleDown color="white"/>]}
                        less={["Show less", <FaAngleUp color="white"/>]}
                        className="content-css"
                        anchorClass="show-more-less-clickable"
                        expanded={false}
                        truncatedEndingComponent={""}
                        >{props.venueResponse.childRule}</ShowMoreText>
                </div>)}
            </div>
      </div>
      <div className="row mt-4" style={{margin:"auto"}}>
        {(props.venueResponse.lat!='' && props.venueResponse.lat!=undefined)&&(<PopUpModal lat={props.venueResponse.lat} long={props.venueResponse.long}></PopUpModal>)}
      </div>
    </div>
    );
}

export default VenueTab;