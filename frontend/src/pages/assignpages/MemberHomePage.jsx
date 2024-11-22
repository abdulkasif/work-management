import React, { useEffect, useState } from "react";
import FetchMemberDetails from "../../components/FetchMemberDetails";
import Header from "../../components/Header";


function MemberHomePage() {
  
  return (
   <>
   <Header/>
   <FetchMemberDetails/>
   </>
  );
}

export default MemberHomePage;
