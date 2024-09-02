import React, { useState } from 'react';
import { Script } from "gatsby";

// import * as styles from './newsletter-form.module.css';

const NewsletterForm = () => {
  // Track state to load in jQuery dependent scripts once jQuery is ready
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <link href="//cdn-images.mailchimp.com/embedcode/classic-071822.css" rel="stylesheet" type="text/css"/>
      <div id="mc_embed_signup" style={{background:'#fff', clear:'left', font:'14px Helvetica,Arial,sans-serif',  width:'600px'}}>
        <form action="https://wellingtonheritageweek.us18.list-manage.com/subscribe/post?u=e4138b21c39b159adc5ff5e90&amp;id=07fe0d4eb3&amp;f_id=008f68e7f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate="novalidate">
          <div id="mc_embed_signup_scroll">
            <div className="indicates-required"><span className="asterisk">*</span> indicates required</div>

            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">Email Address  <span className="asterisk">*</span></label>
              <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required="" aria-required="true" />
              <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
            </div>

            <div className="mc-field-group">
              <label htmlFor="mce-FNAME">First Name </label>
              <input type="text" name="FNAME" className="" id="mce-FNAME" />
              <span id="mce-FNAME-HELPERTEXT" className="helper_text"></span>
            </div>

            <div className="mc-field-group">
              <label htmlFor="mce-LNAME">Last Name </label>
              <input type="text" name="LNAME" className="" id="mce-LNAME" />
              <span id="mce-LNAME-HELPERTEXT" className="helper_text"></span>
            </div>

            <div id="mce-responses" className="clear foot">
              <div className="response" id="mce-error-response" style={{display:'none'}}></div>
              <div className="response" id="mce-success-response" style={{display:'none'}}></div>
            </div>

            <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
              <input type="text" name="b_e4138b21c39b159adc5ff5e90_07fe0d4eb3" tabIndex="-1" value="" />
            </div>

            <div className="optionalParent">
              <div className="clear foot">
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Load in scripts dependent on jQuery once jQuery is ready */}
      <Script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        onLoad={() => setLoaded(true)}
      />
      {loaded && (
        <>
          <Script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js" />
          <Script type="text/javascript">{`(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);`}</Script>
          {/* Newsletter signup form popup scripts */}
          {/* <Script type="text/javascript" charset="utf-8" src="//downloads.mailchimp.com/js/signup-forms/popup/a9a1f47eecd6d697765b294f4891a9a43a6b85d9/popup.js"></Script>
          <Script type="text/javascript" src="//downloads.mailchimp.com/js/signup-forms/popup/embed.js" data-dojo-config="usePlainJson: true, isDebug: false"></Script>
          <script type="text/javascript" dangerouslySetInnerHTML={{
            __html:`
              require(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us18.list-manage.com","uuid":"e4138b21c39b159adc5ff5e90","lid":"07fe0d4eb3"}) })
            `
          }}></script> */}
        </>
      )}
    </>
  );
}

export default NewsletterForm;
