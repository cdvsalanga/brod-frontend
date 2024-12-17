import React from "react";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import Cookies from "../components/Cookies";

const TermsAndConditionsPage = () => {
  const acceptedCookies = document.cookie.includes("Brod");
  const { role } = useParams();
  return (
    <div>
      <Header />
      <div className="pt">
        {role === "client" ? (
          <>
            <h1 className="pt-h1">TERMS AND CONDITIONS FOR CUSTOMERS</h1>
            <div className="pt-space">
              These Terms and Conditions constitute a legally binding agreement
              between you (&quot;Customer&quot;, &quot;you&quot;, or
              &quot;your&quot;) and Deventa Pty Ltd ACN ABN: 85676420634/ACN:
              676420634 trading as Brod (&quot;Brod&quot;, &quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;).
            </div>
            <h2 className="pt-h2">1. ACCEPTANCE OF TERMS</h2>
            <div>
              1.1 By creating an account on the Brod platform, you acknowledge
              that you have read, understood, and agree to be bound by these
              Terms and Conditions. If you do not accept these terms in their
              entirety, you must not register as a Customer or use our platform.
            </div>
            <div className="pt-space">
              These Terms and Conditions may be updated from time to time.
              Continued use of the platform following any changes constitutes
              acceptance of the modified terms.
            </div>
            <h2 className="pt-h2">2. REGISTRATION AND ELIGIBILITY</h2>
            <div>2.1 Eligibility Requirements</div>
            <div className="pt-space">
              To register as a Customer on Brod, you must be at least 18 years
              of age and have the legal capacity to enter into binding
              contracts.
            </div>
            <div>2.2 Account Creation and Information</div>
            <div className="pt-space">
              When creating an account on Brod, you must provide basic
              information including your name, email address, and location. This
              information enables us to facilitate connections with relevant
              service providers in your area. As part of the registration
              process, you will create a secure password. You are responsible
              for ensuring all information provided is accurate and current, as
              this ensures the effective operation of our platform services.
            </div>
            <div>2.3 Profile Information</div>
            <div className="pt-space">
              In creating your profile, you are responsible for providing and
              maintaining accurate, current, and complete information. You
              understand that providing false, misleading, or incomplete
              information may result in immediate account suspension or
              termination. Brod reserves the right to reject your registration
              or suspend your account at our discretion.
            </div>
            <div>2.4 Account Usage</div>
            <div className="pt-space">
              Brod accounts are limited to one per Customer and are for personal
              use only. Your account cannot be transferred, sold, or shared with
              other users. You are responsible for maintaining the security of
              your account and for all activities conducted through your
              account. Any suspected unauthorised use should be reported to us
              immediately.
            </div>
            <h2 className="pt-h2">3. CODE OF CONDUCT</h2>
            <div>3.1 Platform Access</div>
            <div className="pt-space">
              You must not attempt to gain unauthorised access to any part of
              our platform, other user accounts, or computer systems or networks
              connected to our platform. This includes attempting to obtain
              password details and accessing data not intended for you.
            </div>
            <div>3.2 Interference with Platform</div>
            <div className="pt-space">
              You must not take any action that imposes an unreasonable load on
              our platform&#39;s infrastructure or interferes with its proper
              working. This includes using any device, software, or routine to
              interfere with the platform&#39;s operation, or attempting to
              probe, scan, or test the vulnerability of our systems or networks.
            </div>
            <div>3.3 Data Collection and Use</div>
            <div className="pt-space">
              You must not harvest, collect, or attempt to collect information
              about other users, Service Providers, or any data from our
              platform through any means, including:
            </div>
            <div className="pt-list">
              <div>a) Using automated systems, scripts, or bots</div>
              <div>b) Scraping or data mining</div>
              <div>
                c) Creating or compiling databases of platform information
              </div>
              <div>
                d) Attempting to decompile or reverse engineer any part of our
                platform
              </div>
            </div>
            <dv>3.4 Account Integrity</dv>
            <div className="pt-space">
              You must not create multiple accounts, create an account using
              false information, or access the platform by impersonating another
              person. You must not sell, transfer, or allow others to use your
              account.
            </div>
            <div>3.5 Platform Misuse</div>
            <div className="pt-space">You must not use our platform:</div>
            <div className="pt-list">
              <div>
                a) For any unlawful purpose or in violation of any applicable
                laws
              </div>
              <div>b) To harass, abuse, or harm others</div>
              <div>
                c) To transmit any malicious code, viruses, or harmful data
              </div>
              <div>d) To send unsolicited communications or spam</div>
              <div>
                e) To manipulate platform features or circumvent our security
                measures
              </div>
              <div>
                f) To engage in fraudulent behaviour or misrepresent information
              </div>
              <div>g) To compete with or disadvantage our business</div>
            </div>
            <div>3.6 Intellectual Property</div>
            <div className="pt-space">
              You must not modify, copy, distribute, transmit, display, perform,
              reproduce, publish, license, create derivative works from,
              transfer, or sell any information obtained from our platform
              without our express written permission.
            </div>
            <div>3.7 Consequences of Violation</div>
            <div className="pt-space">
              Failure to comply with this Code of Conduct may result in actions
              being taken against your account, including a formal warning,
              temporary suspension of your account, or permanent termination of
              your account. We reserve the right to investigate and take
              appropriate legal action against anyone who violates these
              provisions.
            </div>
            <h2 className="pt-h2">4. NATURE OF OUR SERVICE</h2>
            <div>4.1 Connection Service</div>
            <div className="pt-space">
              Brod is an online platform that connects customers with
              independent trade service providers. We provide the technology to
              facilitate these connections but do not provide any trade services
              ourselves. Our role is limited to providing the platform through
              which you can find and communicate with service providers.
            </div>
            <div>4.2 Independent Service Providers</div>
            <div className="pt-space">
              All Service Providers on our platform are independent contractors
              who operate their own businesses. They are not employees,
              contractors, or agents of Brod. Each Service Provider determines
              their own pricing, availability, and service terms. We do not
              control, and are not responsible for, the quality of their work,
              their pricing, or their business practices.
            </div>
            <div>4.3 Service Provider Verification</div>
            <div className="pt-space">
              Brod does not verify the qualifications, licenses, or insurance
              status of Service Providers on our platform. You acknowledge that
              it is your responsibility to verify any Service Provider&#39;s
              credentials, qualifications, and insurance before engaging their
              services. We recommend that you conduct appropriate due diligence
              before entering into any service agreement.
            </div>
            <div>4.4 Platform Communications</div>
            <div className="pt-space">
              Our platform enables initial communication between customers and
              Service Providers. While we facilitate these initial connections,
              any subsequent arrangements, including service agreements, payment
              terms, and project details, are made directly between you and the
              Service Provider.
            </div>
            <h2 className="pt-h2">5. SERVICE PROVIDER ENGAGEMENT</h2>
            <div>5.1 Direct Agreements</div>
            <div className="pt-space">
              Any agreement for services is formed directly between you and the
              Service Provider. Brod is not a party to these agreements and is
              not involved in or responsible for the terms agreed to between you
              and the Service Provider, including pricing, timing, scope of
              works, or quality standards.
            </div>
            <div>5.2 Payment Arrangements</div>
            <div className="pt-space">
              All payment arrangements are made directly with Service Providers.
              Brod does not process payments, hold funds, or become involved in
              payment disputes between customers and Service Providers. You are
              responsible for arranging payment terms directly with the Service
              Provider.
            </div>
            <div>5.3 Service Disputes</div>
            <div className="pt-space">
              Any disputes regarding service quality, completion, pricing, or
              other aspects of the service must be resolved directly with the
              Service Provider. Brod does not mediate disputes between customers
              and Service Providers, nor do we guarantee the quality or
              completion of any services.
            </div>
            <h2 className="pt-h2">6. SAFETY AND RISK ACKNOWLEDGMENT</h2>
            <div>6.1 General Safety</div>
            <div className="pt-space">
              When engaging Service Providers through our platform, you
              acknowledge that trade services may involve inherent risks. You
              are responsible for ensuring a safe environment for service
              delivery, including providing safe access to your property and
              identifying any potential hazards.
            </div>
            <div>6.2 Service Provider Engagement</div>
            <div className="pt-space">
              While Brod facilitates connections with Service Providers, you
              acknowledge that we do not verify trade qualifications or
              licenses, conduct background checks on Service Providers, verify
              insurance coverage, or supervise and control service delivery. The
              verification of these matters remains your responsibility.
            </div>
            <div>6.3 Your Safety Responsibilities</div>
            <div className="pt-space">
              Before engaging a Service Provider, you should verify their trade
              license and qualifications and check their insurance coverage. You
              should obtain detailed quotes and scope of work and discuss safety
              requirements and procedures. It is your responsibility to ensure
              clear access to work areas, remove valuable items from work areas,
              and secure pets and ensure child safety during service provision.
            </div>
            <div>6.4 Property Access</div>
            <div className="pt-space">
              When providing property access to Service Providers, you remain
              responsible for securing your property and belongings. This
              includes providing safe access to work areas and identifying and
              communicating any property-specific hazards.
            </div>
            <div>6.5 Risk Acknowledgment</div>
            <div className="pt-space">
              You understand and accept that trade services may involve risk of
              property damage, and that work quality depends on the individual
              Service Provider.
            </div>
            <h2 className="pt-h2">7. REVIEW SYSTEM</h2>
            <div>7.1 Providing Reviews</div>
            <div className="pt-space">
              Our platform includes a review system that allows you to share
              your experience with Service Providers. Reviews must be based on
              genuine service experiences and provide honest, factual feedback
              about the services received. Reviews containing offensive
              language, discriminatory content, or false information will be
              removed.
            </div>
            <div>7.2 Review Integrity</div>
            <div className="pt-space">
              All reviews must reflect your actual experience with a Service
              Provider. You must not create false reviews, offer to remove
              negative reviews in exchange for compensation, or attempt to
              manipulate the review system in any way. We reserve the right to
              remove reviews that violate these standards.
            </div>
            <div>7.3 Service Provider Responses</div>
            <div className="pt-space">
              Service Providers have the right to respond to reviews on their
              profile. These responses form part of the public review record and
              cannot be removed unless they violate our platform guidelines.
            </div>
            <div>7.4 Misuse of Review System</div>
            <div className="pt-space">
              Repeated misuse of the review system may result in suspension or
              termination of your account. This includes, but is not limited to,
              posting multiple false reviews, using reviews to harass Service
              Providers, attempting to extort Service Providers through reviews,
              or consistently posting reviews that violate our guidelines. We
              maintain sole discretion in determining what constitutes review
              system misuse.
            </div>
            <h2 className="pt-h2">8. SERVICE PAYMENTS AND ARRANGEMENTS</h2>
            <div>8.1 Direct Payment Responsibility</div>
            <div className="pt-space">
              All payment arrangements are made directly between you and the
              Service Provider. Brod is not involved in processing payments,
              holding deposits, or managing financial transactions. You are
              responsible for arranging payment methods, terms, and timing
              directly with the Service Provider. We strongly recommend
              clarifying payment terms before work commences.
            </div>
            <div>8.2 Price Negotiation and Quotes</div>
            <div className="pt-space">
              Service Providers set their own prices and payment terms
              independently of Brod. Any negotiations regarding pricing, scope
              of work, or payment terms must be conducted directly with the
              Service Provider. You should obtain written quotes that clearly
              specify the scope of work, materials, timeframes, and total costs.
              You acknowledge that additional costs may arise if the scope of
              work changes or unforeseen issues are discovered.
            </div>
            <div>8.3 GST and Taxation</div>
            <div className="pt-space">
              All prices quoted by Service Providers may be subject to GST. It
              is your responsibility to confirm with the Service Provider
              whether their quoted prices include or exclude GST. You should
              request a tax invoice for any services provided. Brod is not
              responsible for any tax obligations arising from transactions
              between you and Service Providers.
            </div>
            <div>8.4 Payment Disputes</div>
            <div className="pt-space">
              Brod does not mediate payment disputes between Customers and
              Service Providers. We recommend documenting all payment
              arrangements in writing and keeping copies of all invoices and
              receipts. Any payment disputes must be resolved directly with the
              Service Provider. This includes disputes about:
            </div>
            <div className="pt-list">
              <div>a) The quality or completion of work</div>
              <div>b) Variations to quoted prices</div>
              <div>c) Timeline delays</div>
              <div>d) Additional costs</div>
              <div>e) Refund requests</div>
            </div>
            <div>8.5 No Platform Fees</div>
            <div className="pt-space">
              Currently, Brod does not charge customers any fees for using the
              platform. If we decide to implement any fees in the future, we
              will provide you with at least 30 days&#39; advance notice through
              both email notification to your registered email address and a
              prominent notice on the platform when you log in. You will have
              the opportunity to decide whether you wish to continue using the
              platform under any new fee structure.
            </div>
            <h2 className="pt-h2">9. DISCLAIMERS AND WARRANTIES</h2>
            <div>9.1 Platform Services</div>
            <div className="pt-space">
              We strive to maintain a reliable platform but do not guarantee
              uninterrupted access to our services. The platform is provided
              &quot;as is&quot; and &quot;as available.&quot; We make no
              representations or warranties about the reliability, availability,
              timeliness, security, or accuracy of our platform.
            </div>
            <div>9.2 Service Provider Quality</div>
            <div className="pt-space">
              While we aim to facilitate connections with quality Service
              Providers, we make no representations or warranties about their
              reliability, capability, or quality of work. We do not verify
              their credentials, qualifications, or insurance status, and we are
              not responsible for any aspects of their service delivery.
            </div>
            <div>9.3 Service Outcomes</div>
            <div className="pt-space">
              We do not guarantee that you will find a suitable Service Provider
              through our platform, nor do we guarantee any outcomes from
              services arranged through our platform. Any agreements made with
              Service Providers are at your own risk and discretion.
            </div>
            <h2 className="pt-h2">10. INDEMNITY</h2>
            <div className="pt-space">
              10.1 YOU AGREE TO INDEMNIFY, DEFEND AND HOLD HARMLESS DEVENTA PTY
              LTD TRADING AS BROD, ITS DIRECTORS, OFFICERS, EMPLOYEES AND AGENTS
              FROM AND AGAINST ALL ACTIONS, CLAIMS, DEMANDS, LOSSES, DAMAGES,
              PROCEEDINGS, COMPENSATION, COSTS, CHARGES AND EXPENSES (INCLUDING
              REASONABLE LEGAL FEES) FOR WHICH DEVENTA PTY LTD MAY BECOME LIABLE
              ARISING FROM OR IN CONNECTION WITH: YOUR USE OF THE BROD PLATFORM;
              YOUR INTERACTIONS WITH SERVICE PROVIDERS; ANY BREACH OF THESE
              TERMS AND CONDITIONS; ANY VIOLATION OF APPLICABLE LAWS OR
              REGULATIONS; ANY FALSE OR MISLEADING INFORMATION PROVIDED BY YOU;
              ANY PROPERTY DAMAGE OR PERSONAL INJURY ARISING FROM YOUR DEALINGS
              WITH SERVICE PROVIDERS; YOUR FAILURE TO ADEQUATELY SECURE YOUR
              PREMISES FOR SERVICE PROVISION; OR ANY MISUSE OF THE
              PLATFORM&#39;S REVIEW OR MESSAGING SYSTEMS.
            </div>
            <h2 className="pt-h2">11. LIMITATION OF LIABILITY</h2>
            <div className="pt-space">
              11.1 TO THE MAXIMUM EXTENT PERMITTED BY LAW, DEVENTA PTY LTD
              TRADING AS BROD SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
              PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR
              ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
              RESULTING FROM: (A) YOUR ACCESS TO OR USE OF OR INABILITY TO
              ACCESS OR USE THE PLATFORM; (B) ANY CONDUCT, WORK QUALITY OR
              SERVICES OF ANY SERVICE PROVIDER OR THIRD PARTY ON THE PLATFORM,
              INCLUDING WITHOUT LIMITATION, ANY DEFECTIVE OR UNSATISFACTORY
              WORK, PROPERTY DAMAGE, PERSONAL INJURY, OR DELAYS IN SERVICE
              COMPLETION; (C) ANY UNAUTHORISED ACCESS TO OR USE OF OUR SERVERS
              AND/OR ANY PERSONAL INFORMATION STORED THEREIN; (D) ANY
              INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE PLATFORM;
              (E) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE
              TRANSMITTED TO OR THROUGH THE PLATFORM; (F) ANY DISPUTES BETWEEN
              YOU AND SERVICE PROVIDERS; (G) ANY LOSS OR DAMAGE ARISING FROM
              YOUR FAILURE TO ADEQUATELY VET OR VERIFY SERVICE PROVIDER
              CREDENTIALS, QUALIFICATIONS OR INSURANCE STATUS; (H) ANY DAMAGES
              RESULTING FROM COMMUNICATION FAILURES, SYSTEM FAILURES, OR
              PLATFORM DOWNTIME; (I) ANY FALSE, MISLEADING, OR INACCURATE
              INFORMATION PROVIDED BY SERVICE PROVIDERS OR OTHER USERS OF THE
              PLATFORM; (J) ANY SECURITY BREACHES OR CYBER ATTACKS; OR (K) ANY
              DISCONTINUATION OR TERMINATION OF THE PLATFORM OR ANY PLATFORM
              FEATURES OR SERVICES. NOTHING IN THESE TERMS EXCLUDES, RESTRICTS
              OR MODIFIES ANY GUARANTEE, WARRANTY, TERM OR CONDITION, RIGHT OR
              REMEDY IMPLIED OR IMPOSED BY ANY APPLICABLE LAW WHICH CANNOT
              LAWFULLY BE EXCLUDED, RESTRICTED OR MODIFIED.
            </div>
            <div>12.1 Information Collection</div>
            <div className="pt-space">
              We collect and handle your personal information in accordance with
              our Privacy Policy{" "}
              <Link to={"/privacy-policy"} className="link-none">
                brod.com.au/privacy-policy
              </Link>{" "}
              and applicable privacy laws. By using our platform, you consent to
              our collection and use of your information as described in our
              Privacy Policy.
            </div>
            <div>12.2 Data Collection and Use</div>
            <div className="pt-space">
              We collect and handle your personal information in accordance with
              the Privacy Act 1988 (Cth), Australian Privacy Principles (APPs)
              and our Privacy Policy. The information you provide when creating
              and maintaining your profile will be used to facilitate platform
              services.
            </div>
            <div>12.3 Data Security</div>
            <div className="pt-space">
              While we implement reasonable security measures to protect your
              information, you acknowledge that no method of electronic storage
              or transmission is completely secure. You are responsible for
              maintaining the confidentiality of your account credentials and
              must notify us immediately of any unauthorised access to your
              account.
            </div>
            <div>12.4 Communications</div>
            <div className="pt-space">
              By using our platform, you consent to receive communications from
              Brod relating to your account, platform updates, and service
              notifications. These communications are part of the platform
              service and are necessary for its proper operation.
            </div>
            <h2 className="pt-h2">13. INTELLECTUAL PROPERTY</h2>
            <div>13.1 Platform Content</div>
            <div className="pt-space">
              All content on the Brod platform, including but not limited to the
              website design, logos, graphics, text, and software, is owned by
              or licensed to Deventa Pty Ltd and is protected by copyright and
              other intellectual property laws. You may not copy, modify,
              distribute, or reproduce this content without our express written
              permission.
            </div>
            <div>13.2 Your Content</div>
            <div className="pt-space">
              When you submit content to our platform, such as service requests,
              messages, or reviews, you retain ownership of your content.
              However, you grant Brod a non- exclusive, worldwide, royalty-free
              license to use, display, and distribute this content for the
              purpose of operating and promoting the platform.
            </div>
            <h2 className="pt-h2">14. MODIFICATIONS TO THE PLATFORM</h2>
            <div>14.1 Platform Changes</div>
            <div className="pt-space">
              Brod reserves the right to modify, suspend, or discontinue any
              aspect of the platform at any time without prior notice. This
              includes changing or removing platform features, altering how
              Customers and Service Providers interact, or updating the user
              interface.
            </div>
            <div>14.2 Effect of Changes</div>
            <div className="pt-space">
              While we may notify you of significant changes through the
              platform or via your registered email address, we are not
              obligated to maintain any particular feature or functionality. You
              understand that changes to the platform may affect how you use it
              to connect with Service Providers.
            </div>
            <h2 className="pt-h2">15. ACCURACY OF INFORMATION</h2>
            <div>15.1 Platform Information</div>
            <div className="pt-space">
              While we strive to keep all information on the platform current,
              we do not guarantee the accuracy, completeness, or timeliness of
              information available on Brod. This includes Service Provider
              profiles, service areas, and availability status. You should
              verify critical information directly with Service Providers before
              engaging their services.
            </div>
            <div>15.2 Service Provider Information</div>
            <div className="pt-space">
              Information about services, pricing, and availability is provided
              by Service Providers and not verified by Brod. You should not rely
              solely on platform information when making decisions about
              engaging services. We recommend obtaining written quotes and
              verification of qualifications directly from Service Providers.
            </div>
            <h2 className="pt-h2">16. PLATFORM AVAILABILITY</h2>
            <div>16.1 Platform Availability</div>
            <div className="pt-space">
              We do not guarantee uninterrupted access to our platform. The
              platform may be unavailable due to maintenance, technical issues,
              or other factors beyond our control. You acknowledge that
              temporary interruptions to platform access may occur.
            </div>
            <h2 className="pt-h2">17. ERRORS INACCURACIES AND OMISSIONS</h2>
            <div>17.1 Error Correction</div>
            <div className="pt-space">
              We reserve the right to correct any errors, inaccuracies or
              omissions on our platform without prior notice. This includes
              errors in Service Provider information, platform features, or any
              other content displayed on Brod.
            </div>
            <h2 className="pt-h2">18. THIRD PARTY TOOLS AND FEATURES</h2>
            <div>18.1 Third Party Tools</div>
            <div className="pt-space">
              The Brod platform may include or provide access to third-party
              tools that assist in connecting Customers with Service Providers.
              These tools are provided &quot;as is&quot; and &quot;as
              available&quot; without any warranties or endorsement from us.
              Your use of any third- party tools is at your own risk, and you
              should review any applicable third-party terms of service. Deventa
              Pty Ltd has no control over and accepts no responsibility for any
              third-party tools used on the platform.
            </div>
            <div>18.2 New Features</div>
            <div className="pt-space">
              We may introduce new features or tools to the platform in the
              future. Any new features or tools will be subject to these Terms
              and Conditions.
            </div>
            <h2 className="pt-h2">19. EXTERNAL LINKS AND CONTENT</h2>
            <div>19.1 Third Party Links</div>
            <div className="pt-space">
              The platform may contain links to external websites, particularly
              those relating to trade services, licensing bodies, or industry
              associations. These links are provided for your convenience only.
              Deventa Pty Ltd is not responsible for the content, accuracy, or
              reliability of linked websites and does not endorse the content,
              products, or services they provide.
            </div>
            <div>19.2 Third Party Transactions</div>
            <div className="pt-space">
              Any transactions you enter into with third parties through links
              from our platform are solely between you and that third party.
              Deventa Pty Ltd is not responsible for any losses or damages you
              may incur from such transactions or interactions. We recommend you
              carefully review any third party&#39;s terms and policies before
              engaging with them.
            </div>
            <h2 className="pt-h2">20. TERMINATION AND SUSPENSION</h2>
            <div>20.1 Account Deactivation</div>
            <div className="pt-space">
              You may deactivate your customer account at any time through the
              platform settings. Upon deactivation, your account will no longer
              be active, though certain information may be retained in
              accordance with our Privacy Policy.
            </div>
            <div>20.2 Platform Right to Suspend or Terminate</div>
            <div className="pt-space">
              Brod may suspend or terminate your account if we reasonably
              believe that you have breached these Terms and Conditions, engaged
              in fraudulent, unlawful, or inappropriate behaviour, or harassed
              or abused Service Providers. We may also take this action if your
              account information is false or misleading, your account has been
              inactive for an extended period, or if we believe that
              continuation of your access poses a risk to our platform or other
              users.
            </div>
            <div>20.3 Effect of Termination</div>
            <div className="pt-space">
              Upon termination or suspension of your account, you will no longer
              be able to access the platform and any ongoing communications with
              Service Providers through the platform will cease. Your account
              information will be retained in accordance with our Privacy
              Policy. Any active service arrangements should be concluded
              directly with the relevant Service Provider.
            </div>
            <h2 className="pt-h2">21. SURVIVAL OF TERMS</h2>
            <div className="pt-space">
              21.1 Certain provisions of these Terms and Conditions continue to
              apply even after your account is terminated. These include, but
              are not limited to, indemnities you have provided, warranties you
              have made, and limitations of liability.
            </div>
            <h2 className="pt-h2">22. DISPUTE RESOLUTION</h2>
            <div>22.1 Disputes with Service Providers</div>
            <div className="pt-space">
              Any disputes regarding services, payments, work quality, or other
              matters relating to trade services must be resolved directly with
              the relevant Service Provider. Brod is not a party to these
              disputes and does not mediate or resolve issues between customers
              and Service Providers.
            </div>
            <div>22.2 Disputes with Brod</div>
            <div className="pt-space">
              If a dispute arises between you and Brod concerning these Terms or
              your use of the platform, both parties agree to first attempt to
              resolve the dispute through good faith negotiations. The party
              raising the dispute must provide written notice to the other party
              describing the nature of the dispute. Within 14 days of such
              notice, representatives from both parties must meet (in person or
              virtually) to attempt to resolve the dispute.
            </div>
            <div>22.3 Mediation</div>
            <div className="pt-space">
              If the dispute is not resolved through good faith negotiations
              within 30 days of the initial notice, either party may refer the
              dispute to mediation. The mediation will be conducted in Sydney,
              New South Wales and administered by the Australian Disputes Centre
              (ADC). The mediation will be conducted according to the ADC
              Mediation Guidelines in force at the time of the dispute. The
              costs of mediation will be shared equally between both parties
              unless agreed otherwise.
            </div>
            <div>22.4 Consumer Rights</div>
            <div className="pt-space">
              Nothing in these dispute resolution provisions limits your rights
              to pursue action under the Australian Consumer Law or to file a
              complaint with a relevant regulatory authority.
            </div>
            <h2 className="pt-h2">23. GENERAL TERMS</h2>
            <div>23.1 Discontinuance of Platform</div>
            <div className="pt-space">
              Brod may, at any time and without notice to you, discontinue the
              platform, in whole or in part. We may also exclude any customer
              from using the platform at our sole discretion. We are not
              responsible for any liability you may suffer arising from or in
              connection with any such discontinuance or exclusion, including
              the inability to connect with Service Providers or complete
              ongoing service arrangements.
            </div>
            <div>23.2 Warranties and Disclaimers</div>
            <div className="pt-space">
              We do not guarantee that your use of Brod will be uninterrupted,
              timely, secure, or error-free. You expressly agree that your use
              of, or inability to use, the platform is at your sole risk. The
              platform is provided &#39;as is&#39; and &#39;as available&#39;
              for your use, without any representation, warranties, or
              conditions of any kind, either express or implied. This includes
              no guarantees about the availability, quality, or reliability of
              any Service Provider you may connect with through our platform.
              You are responsible for ensuring you have appropriate technical
              capabilities to access and use our platform. We do not warrant
              that the platform will be compatible with all devices or browsers.
            </div>
            <div>23.3 Severability</div>
            <div className="pt-space">
              If any provision of these Terms is held to be void, invalid,
              illegal, or unenforceable, that provision must be read down as
              narrowly as necessary to allow it to be valid or enforceable. If
              it is not possible to read down a provision, that provision is
              severed from these Terms without affecting the validity of the
              remaining provisions.
            </div>
            <div>23.4 No Waiver</div>
            <div className="pt-space">
              Brod&#39;s failure to exercise or enforce any right or provision
              of these Terms shall not constitute a waiver of such right or
              provision.
            </div>
            <div>23.5 Interpretation</div>
            <div className="pt-space">
              The headings in these Terms are included for convenience only and
              will not limit or otherwise affect these Terms.
            </div>
            <div>23.6 Entire Agreement</div>
            <div className="pt-space">
              These Terms constitute the entire agreement between you and Brod
              regarding your use of our platform as a customer, superseding any
              prior agreements or understandings. This includes any
              communications or representations made prior to your acceptance of
              these Terms.
            </div>
            <div>23.7 Governing Law</div>
            <div className="pt-space">
              Your use of our Site or Products or services are governed by the
              laws of New South Wales (NSW) Australia. You irrevocably and
              unconditionally submit to the exclusive jurisdiction of the courts
              operating in NSW Australia and any courts entitled to hear appeals
              from those courts and waive any right to object to proceedings
              being brought in those courts.
            </div>
            <div>23.8 Contact</div>
            <div>
              Any questions or complaints relating to these Terms, or our
              platform should be directed to support@brod.com.au.
            </div>
          </>
        ) : (
          <>
            <h1 className="pt-h1">
              TERMS AND CONDITIONS FOR SERVICE PROVIDERS
            </h1>
            <div className="pt-space">
              These Terms and Conditions constitute a legally binding agreement
              between you (&quot;Service Provider&quot;, &quot;you&quot;, or
              &quot;your&quot;) and Deventa Pty Ltd ABN: 85676420634/ACN:
              676420634 trading as Brod (&quot;Brod&quot;, &quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;).
            </div>
            <h2 className="pt-h2">1. ACCEPTANCE OF TERMS</h2>
            <div>
              1.1 By creating an account on the Brod platform, you acknowledge
              that you have read, understood, and agree to be bound by these
              Terms and Conditions. If you do not accept these terms in their
              entirety, you must not register as a Service Provider or use our
              platform.
            </div>
            <div className="pt-space">
              These Terms and Conditions may be updated from time to time.
              Continued use of the platform following any changes constitutes
              acceptance of the modified terms.
            </div>
            <h2 className="pt-h2">2. REGISTRATION AND ELIGIBILITY</h2>
            <div>2.1 Eligibility Requirements</div>
            <div className="pt-space">
              To register as a Service Provider on Brod, you must hold a valid
              Australian Business Number (ABN), be at least 18 years of age, and
              have the legal capacity to enter binding contracts.
            </div>
            <div>2.2 Profile Information</div>
            <div className="pt-space">
              In creating your profile, you are responsible for providing and
              maintaining accurate, current, and complete information. You
              understand that providing false, misleading, or incomplete
              information may result in immediate account suspension or
              termination. Brod reserves the right to reject your registration
              or suspend your account at our discretion.
            </div>
            <div>2.3 Profile Display</div>
            <div className="pt-space">
              When you register with Brod, you give us permission to display
              your profile information to potential customers. This includes
              your business name, location and ABN, the types of services you
              offer, your service areas, description of your experience, any
              portfolio images you choose to share, and customer reviews.
            </div>
            <div>2.4 Multiple Accounts</div>
            <div className="pt-space">
              You may not create multiple profiles for the same business unless
              you have received express written consent from Brod.
            </div>
            <h2 className="pt-h2">3. NATURE OF OUR SERVICE</h2>
            <div>3.1 Connection Service</div>
            <div className="pt-space">
              Brod is an online platform that connects Service Providers with
              potential customers. We provide the technology to facilitate these
              connections, but we are not involved in the actual service
              delivery or contracts between Service Providers and customers.
            </div>
            <div>3.2 No Guarantees</div>
            <div className="pt-space">
              While we provide the platform to connect you with potential
              customers, we cannot and do not guarantee any level of business
              success, minimum number of customer enquiries, or revenue through
              your use of Brod. Your business success depends on various
              factors, including but not limited to your own business practices,
              customer service, and market conditions.
            </div>
            <div>3.3 Business Discretion</div>
            <div className="pt-space">
              As an independent business, you maintain complete control over
              your operations. This means you:
            </div>
            <div className="pt-list">
              <div>a) Choose which job enquiries to respond to</div>
              <div>b) Set your own pricing and payment terms</div>
              <div>c) Determine your own working hours and availability</div>
              <div>d) Manage your own business practices</div>
            </div>
            <h2 className="pt-h2">4. INDEPENDENT CONTRACTOR STATUS</h2>
            <div className="pt-space">
              4.1 You acknowledge and agree that your use of the Brod platform
              does not create any employment, partnership, joint venture, or
              agency relationship between you and Deventa Pty Ltd trading as
              Brod. You are an independent contractor and nothing in these Terms
              will be interpreted or construed as creating or implying any
              employment or agency relationship.
            </div>
            <div className="pt-space">
              4.2 As an independent contractor, you are solely responsible for
              determining how you provide your services, including setting your
              own hours, methods of work, pricing, and business practices. You
              have no authority to bind Brod or make any representations on
              Brod&#39;s behalf. You must not represent yourself as an employee,
              representative, or agent of Brod to any customers or third
              parties.
            </div>
            <div className="pt-space">
              4.3 You are solely responsible for all tax obligations arising
              from your use of the platform and provision of services, including
              but not limited to:
            </div>
            <div className="pt-list">
              <div>a) Registering for GST if required by law</div>
              <div>b) Charging and collecting GST where applicable</div>
              <div>
                c) Reporting and remitting GST to the Australian Taxation Office
              </div>
              <div>d) Maintaining proper tax records and documentation</div>
              <div>e) Declaring all income earned through the platform</div>
              <div>f) Paying all applicable income tax</div>
              <div>
                g) Managing any other tax obligations relevant to your business
              </div>
            </div>
            <div className="pt-space">
              4.4 You acknowledge that as an independent contractor, you are
              responsible for all expenses related to your business operations.
              You are not entitled to any employment benefits from Brod,
              including but not limited to annual leave, sick leave,
              superannuation contributions, workers compensation insurance, or
              any other employment-related entitlements.
            </div>
            <h2 className="pt-h2">
              5. SERVICE AGREEMENTS AND CUSTOMER RELATIONS
            </h2>
            <div>5.1 Service Agreements</div>
            <div className="pt-space">
              Any agreement for services, whether verbal or written, is formed
              directly between you and the customer. Brod is not involved in the
              negotiation, execution, or performance of these agreements. You
              acknowledge that Brod has no control over, and no responsibility
              or liability for:
            </div>
            <div className="pt-list">
              <div>a) The terms of your service agreements</div>
              <div>b) The quality or completion of services</div>
              <div>c) Payment arrangements or disputes</div>
              <div>d) Any disputes arising from service delivery</div>
              <div>e) Customer satisfaction or complaints</div>
              <div>f) Any claims arising from your services</div>
            </div>
            <div>5.2 Dispute Resolution Between Parties</div>
            <div className="pt-space">
              Any disputes arising between you and customers must be resolved
              directly between the parties involved. Brod will not mediate or
              resolve any disputes regarding services, payments, or contractual
              obligations. You acknowledge that you are solely responsible for
              managing and resolving any customer disputes.
            </div>
            <h2 className="pt-h2">
              6. CODE OF CONDUCT AND PROFESSIONAL STANDARDS
            </h2>
            <div>6.1 Professional Behaviour</div>
            <div className="pt-space">
              As a Service Provider on Brod, you are expected to maintain
              professional standards in all your interactions. This includes
              communicating respectfully with customers, providing accurate
              information about your services, and conducting your business
              ethically and professionally.
            </div>
            <div>6.2 Platform Conduct</div>
            <div className="pt-space">
              When using the Brod platform, you must respond to customer
              enquiries in a professional manner, provide clear and accurate
              information about your services and pricing, maintain honest and
              ethical business practices, and comply with all applicable laws
              and regulations in your trade.
            </div>
            <div>6.3 Platform Integrity</div>
            <div className="pt-space">
              You must not attempt to gain unauthorised access to any part of
              our platform, other Service Provider accounts, customer accounts,
              or our systems and networks. You must not take any action that
              interferes with the platform&#39;s operation or imposes an
              unreasonable load on our infrastructure.
            </div>
            <div>6.4 Data and System Protection</div>
            <div className="pt-space">
              You must not collect or attempt to collect information about
              customers or other Service Providers through automated means,
              including scraping, data mining, or using bots. You must not
              attempt to decompile or reverse engineer any part of our platform
              or create unauthorised databases of platform information.
            </div>
            <div>6.5 Account Integrity</div>
            <div className="pt-space">
              You must not create multiple accounts for the same business
              without our express permission, create accounts using false
              business information, or misrepresent your qualifications,
              experience, or insurance status. Your account cannot be sold,
              transferred, or used by others.
            </div>
            <div>6.6 Prohibited Behaviour</div>
            <div className="pt-space">
              To maintain the integrity of our platform and protect all users,
              you must not:
            </div>
            <div className="pt-list">
              <div>a) Use the platform for any unlawful purpose</div>
              <div>
                b) Harass, abuse, or harm customers or other Service Providers
              </div>
              <div>c) Send unsolicited communications or spam</div>
              <div>
                d) Manipulate platform features or circumvent security measures
              </div>
              <div>e) Engage in fraudulent behaviour</div>
              <div>f) Misrepresent your services or capabilities</div>
              <div>
                g) Artificially manipulate your visibility or search rankings
              </div>
              <div>h) Compete with or disadvantage our business</div>
            </div>
            <div>6.7 Consequences of Violation</div>
            <div className="pt-space">
              Failure to comply with this Code of Conduct may result in actions
              being taken against your account, including a formal warning,
              temporary suspension of your account, or permanent termination of
              your account. We reserve the right to investigate and take
              appropriate legal action against anyone who violates these
              provisions.
            </div>
            <h2 className="pt-h2">7. REVIEW SYSTEM</h2>
            <div>7.1 Customer Reviews</div>
            <div className="pt-space">
              Our platform includes a review system allowing customers to share
              their experiences with your services. These reviews help build
              trust in the platform and can significantly benefit your business
              reputation. When a customer leaves a review, it will be published
              on your profile as long as it meets our community guidelines. We
              believe in maintaining transparency, so we do not edit or modify
              review content unless it violates these guidelines. The reviews
              and ratings become an integral part of your business profile.
            </div>
            <div>7.2 Review Integrity</div>
            <div className="pt-space">
              The credibility of our review system depends on honest feedback
              from genuine customers. You must not attempt to manipulate this
              system by creating fake reviews or offering incentives for
              positive reviews. Any form of pressure on customers regarding
              their reviews is strictly prohibited. We take the integrity of our
              review system seriously, and any attempt to manipulate it may
              result in account suspension.
            </div>
            <div>7.3 Managing Reviews</div>
            <div className="pt-space">
              We understand that reviews can significantly impact your business.
              If you receive a review, you have the right to respond
              professionally and provide your perspective on the service
              interaction. If a review contains hate speech, discrimination, or
              demonstrably false information, you may request its removal. We
              encourage you to report any reviews that violate our platform
              guidelines, and we will assess them fairly.
            </div>
            <div>7.4 Using Reviews</div>
            <div className="pt-space">
              Your reviews on Brod are a valuable tool for building your online
              reputation. We encourage you to engage professionally with both
              positive and negative feedback, using it as an opportunity to
              showcase your customer service and commitment to improvement. This
              feedback can provide valuable insights to help you enhance your
              services and grow your business.
            </div>
            <h2 className="pt-h2">8. USING THE PLATFORM</h2>
            <div>8.1 Profile Management</div>
            <div className="pt-space">
              We expect you to keep your service information current, including
              your availability and service areas. Regular updates to your
              profile ensure potential customers receive accurate information
              about your services and can make informed decisions about engaging
              your business.
            </div>
            <div>8.2 Account Security</div>
            <div className="pt-space">
              Your account security is paramount to maintaining the integrity of
              your business presence on Brod. You are responsible for keeping
              your login details confidential and must notify us immediately if
              you suspect any unauthorised access to your account. Regular
              monitoring of your account activity helps ensure your business
              information remains secure and protected.
            </div>
            <h2 className="pt-h2">9. BUSINESS OBLIGATIONS AND WARRANTIES</h2>
            <div>9.1 Platform Role</div>
            <div className="pt-space">
              While we provide the platform to connect Service Providers with
              customers, Brod does not verify, endorse, or guarantee any aspect
              of customer interactions or transactions. We act solely as a
              connection platform and are not responsible for the actions,
              reliability, or trustworthiness of customers you may interact with
              through our service.
            </div>
            <div>9.2 Your Professional Obligations</div>
            <div className="pt-space">
              As an independent business operator, you are solely responsible
              for the quality and completion of your work, any warranties or
              guarantees you provide to customers, and ensuring compliance with
              all applicable laws, regulations, and industry standards that
              apply to your trade.
            </div>
            <div>9.3 Insurance Acknowledgment</div>
            <div className="pt-space">
              You acknowledge that certain insurances may be legally required
              for your trade or profession under Australian law, such as public
              liability insurance or professional indemnity insurance. While
              Brod does not verify your insurance status or impose additional
              insurance requirements beyond your legal obligations, you
              understand that operating without legally required insurance
              coverage may expose you to significant risks and legal
              consequences.
            </div>
            <div>9.4 Service Delivery</div>
            <div className="pt-space">
              You are responsible for delivering services to customers in a
              professional, competent, and timely manner. This includes
              maintaining any necessary licenses, permits, or certifications
              required for your trade, and ensuring all work meets applicable
              industry standards and regulations.
            </div>
            <h2 className="pt-h2">10. SERVICE PAYMENTS AND ARRANGEMENTS</h2>
            <div>10.1 Independent Payment Arrangements</div>
            <div className="pt-space">
              Any payment arrangements for services you provide are made
              directly between you and your customers. Brod is not involved in
              processing payments, setting prices, or managing financial
              transactions between you and your customers.
            </div>
            <div>10.2 Your Payment Responsibilities</div>
            <div className="pt-space">
              You maintain complete control and responsibility over all
              financial aspects of your business. This includes setting your own
              rates and payment terms, arranging payment collection methods,
              managing your own invoicing, and handling any payment disputes
              with customers.
            </div>
            <h2 className="pt-h2">11. INDEMNITY</h2>
            <div className="pt-space">
              YOU AGREE TO INDEMNIFY, DEFEND AND HOLD HARMLESS DEVENTA PTY LTD
              TRADING AS BROD, ITS DIRECTORS, OFFICERS, EMPLOYEES AND AGENTS
              FROM AND AGAINST ALL ACTIONS, CLAIMS, DEMANDS, LOSSES, DAMAGES,
              PROCEEDINGS, COMPENSATION, COSTS, CHARGES AND EXPENSES (INCLUDING
              REASONABLE LEGAL FEES) FOR WHICH DEVENTA PTY LTD MAY BECOME LIABLE
              ARISING FROM OR IN CONNECTION WITH: YOUR USE OF THE BROD PLATFORM;
              ANY SERVICES YOU PROVIDE TO CUSTOMERS; ANY BREACH OF THESE TERMS
              AND CONDITIONS; ANY VIOLATION OF APPLICABLE LAWS OR REGULATIONS;
              ANY DISPUTE WITH CUSTOMERS OR THIRD PARTIES; OR ANY NEGLIGENT ACTS
              OR OMISSIONS IN PROVIDING YOUR SERVICES.
            </div>
            <h2 className="pt-h2">12. LIMITATION OF LIABILITY</h2>
            <div className="pt-space">
              12.1 TO THE MAXIMUM EXTENT PERMITTED BY LAW, DEVENTA PTY LTD
              TRADING AS BROD SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
              PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR
              ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
              RESULTING FROM: (A) YOUR ACCESS TO OR USE OF OR INABILITY TO
              ACCESS OR USE THE PLATFORM; (B) ANY CONDUCT OR CONTENT OF ANY
              THIRD PARTY ON THE PLATFORM, INCLUDING WITHOUT LIMITATION, ANY
              DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF OTHER USERS OR THIRD
              PARTIES; (C) ANY CONTENT OBTAINED FROM THE PLATFORM; (D)
              UNAUTHORISED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR
              CONTENT; (E) ANY DISPUTES BETWEEN SERVICE PROVIDERS AND CUSTOMERS;
              (F) ANY FAILURE TO SECURE WORK THROUGH THE PLATFORM; (G) ANY
              PAYMENT DISPUTES BETWEEN SERVICE PROVIDERS AND CUSTOMERS; (H) ANY
              DAMAGES ARISING FROM COMMUNICATION FAILURES, SYSTEM FAILURES, OR
              PLATFORM DOWNTIME; (I) ANY FALSE, MISLEADING, OR INACCURATE
              INFORMATION PROVIDED BY USERS OF THE PLATFORM; (J) ANY SECURITY
              BREACHES OR CYBER ATTACKS; OR (K) ANY DISCONTINUATION OR
              TERMINATION OF THE PLATFORM OR ANY PLATFORM FEATURES OR SERVICES.
              NOTHING IN THESE TERMS EXCLUDES, RESTRICTS OR MODIFIES ANY
              GUARANTEE, WARRANTY, TERM OR CONDITION, RIGHT OR REMEDY IMPLIED OR
              IMPOSED BY ANY APPLICABLE LAW WHICH CANNOT LAWFULLY BE EXCLUDED,
              RESTRICTED OR MODIFIED.
            </div>
            <h2 className="pt-h2">13. FEES AND PAYMENTS</h2>
            <div>13.1 No Platform Fees</div>
            <div className="pt-space">
              Currently, Brod operates as a free platform for Service Providers.
              You can create a profile, list your services, and communicate with
              potential customers without paying any registration or ongoing
              fees to Brod.
            </div>
            <div>13.2 Future Changes</div>
            <div className="pt-space">
              We may introduce fees in the future. If we decide to implement any
              fees, we will provide you with at least 30 days&#39; advance
              notice through both email notification to your registered email
              address and a prominent notice on the platform when you log in.
              The notice will clearly explain any new fee structure, including
              the amount of fees, how they will be calculated, and when they
              will come into effect. You will have the opportunity to decide
              whether you wish to continue using the platform under the new fee
              structure before it takes effect. If you do not agree to the new
              fees, you may terminate your account prior to their
              implementation.
            </div>
            <h2 className="pt-h2">14. PRIVACY AND DATA PROTECTION</h2>
            <div>14.1 Privacy Policy</div>
            <div className="pt-space">
              Your use of Brod is also governed by our Privacy Policy{" "}
              <Link to={"/privacy-policy"} className="link-none">
                brod.com.au/privacy-policy
              </Link>
              , which explains how we collect, use, store and protect your
              personal information. By accepting these Terms and Conditions, you
              acknowledge that you have read and understood our Privacy Policy.
            </div>
            <div>14.2 Data Collection and Use</div>
            <div className="pt-space">
              We collect and handle your personal information in accordance with
              the Privacy Act 1988 (Cth), Australian Privacy Principles (APPs)
              and our Privacy Policy. The information you provide when creating
              and maintaining your profile will be visible to potential
              customers and used to facilitate platform services.
            </div>
            <div>14.3 Data Security</div>
            <div className="pt-space">
              While we implement reasonable security measures to protect your
              information, you acknowledge that no method of electronic storage
              or transmission is completely secure. You are responsible for
              maintaining the confidentiality of your account credentials and
              must notify us immediately of any unauthorised access to your
              account.
            </div>
            <div>14.4 Communications</div>
            <div className="pt-space">
              By using our platform, you consent to receive communications from
              Brod relating to your account, platform updates, and service
              notifications. These communications are part of the platform
              service and are necessary for its proper operation.
            </div>
            <h2 className="pt-h2">15. INTELLECTUAL PROPERTY</h2>
            <div>15.1 Platform Content</div>
            <div className="pt-space">
              All content on the Brod platform, including but not limited to the
              website design, logos, graphics, text, and software, is owned by
              or licensed to Deventa Pty Ltd trading as Brod, and is protected
              by copyright and other intellectual property laws. You may not
              copy, modify, distribute, or reproduce this content without our
              express written permission.
            </div>
            <div>15.2 Your Content</div>
            <div className="pt-space">
              When you create your profile and upload content such as business
              information, photos, or service descriptions, you retain ownership
              of your content. However, you grant Brod a non-exclusive,
              worldwide, royalty-free license to use, display, and distribute
              this content for the purpose of operating and promoting the
              platform.
            </div>
            <div>15.3 Reviews and Feedback</div>
            <div className="pt-space">
              Any reviews or feedback provided by customers about your services
              become part of our platform&#39;s content. While these reviews
              relate to your business, the compiled review system and associated
              data are owned by Brod.
            </div>
            <div>15.4 Brand Usage</div>
            <div className="pt-space">
              You may not use the Brod name, logo, or other brand elements
              without our express written permission. Any authorised use must
              comply with our brand guidelines and may be revoked at any time.
            </div>
            <h2 className="pt-h2">16. MODIFICATIONS TO THE PLATFORM</h2>
            <div>16.1 Platform Changes</div>
            <div className="pt-space">
              Brod reserves the right to modify, suspend, or discontinue any
              aspect of the platform (including any features, functions, or
              content) at any time without prior notice. This includes the right
              to:
            </div>
            <div className="pt-list">
              <div>a) Change the platform&#39;s features or functionality</div>
              <div>b) Update the user interface</div>
              <div>c) Remove or add services</div>
              <div>d) Modify how Service Providers and customers interact</div>
              <div>e) Alter any aspect of the review system</div>
              <div>f) Change communication methods</div>
              <div>g) Implement new technology</div>
            </div>
            <div>16.2 Effect of Changes</div>
            <div className="pt-space">
              If we make significant changes to the platform, we may notify you
              through the platform or via your registered email address.
              However, you acknowledge that we are not obligated to maintain any
              particular feature or functionality. You understand that some
              changes may affect how you use the platform or interact with
              customers.
            </div>
            <div>16.3 No Liability</div>
            <div className="pt-space">
              We shall not be liable to you or any third party for any
              modification, suspension, or discontinuance of the platform or any
              of its features. This includes any impact such changes may have on
              your business operations or customer relationships developed
              through the platform.
            </div>
            <h2 className="pt-h2">17. ACCURACY OF INFORMATION</h2>
            <div>17.1 Platform Information</div>
            <div className="pt-space">
              While we strive to keep all information on the platform current,
              we do not guarantee the accuracy, completeness, or timeliness of
              information available on Brod.
            </div>
            <h2 className="pt-h2">18. PLATFORM AVAILABILITY</h2>
            <div>18.1 Platform Availability</div>
            <div className="pt-space">
              We do not guarantee uninterrupted access to our platform. The
              platform may be unavailable due to maintenance, technical issues,
              or other factors beyond our control. You acknowledge that
              temporary interruptions to platform access may occur.
            </div>
            <h2 className="pt-h2">19. ERRORS INACCURACIES AND OMISSIONS</h2>
            <div>19.1 Error Correction</div>
            <div className="pt-space">
              We reserve the right to correct any errors, inaccuracies or
              omissions on our platform without prior notice. This includes
              errors in platform features, or any other content displayed on
              Brod.
            </div>
            <h2 className="pt-h2">20. THIRD PARTY TOOLS AND FEATURES</h2>
            <div>20.1 Third Party Tools</div>
            <div className="pt-space">
              The Brod platform may include or provide access to third-party
              tools that assist in connecting Customers with Service Providers.
              These tools are provided &quot;as is&quot; and &quot;as
              available&quot; without any warranties or endorsement from us.
              Your use of any third- party tools is at your own risk, and you
              should review any applicable third-party terms of service. Deventa
              Pty Ltd has no control over and accepts no responsibility for any
              third-party tools used on the platform.
            </div>
            <div>20.2 New Features</div>
            <div className="pt-space">
              We may introduce new features or tools to the platform in the
              future. Any new features or tools will be subject to these Terms
              and Conditions.
            </div>
            <h2 className="pt-h2">21. EXTERNAL LINKS AND CONTENT</h2>
            <div>21.1 Third Party Links</div>
            <div className="pt-space">
              The platform may contain links to external websites, particularly
              those relating to trade services, licensing bodies, or industry
              associations. These links are provided for your convenience only.
              Deventa Pty Ltd is not responsible for the content, accuracy, or
              reliability of linked websites and does not endorse the content,
              products, or services they provide.
            </div>
            <div>21.2 Third Party Transactions</div>
            <div className="pt-space">
              Any transactions you enter into with third parties through links
              from our platform are solely between you and that third party.
              Deventa Pty Ltd is not responsible for any losses or damages you
              may incur from such transactions or interactions. We recommend you
              carefully review any third party&#39;s terms and policies before
              engaging with them.
            </div>
            <h2 className="pt-h2">22. TERMINATION AND SUSPENSION</h2>
            <div>22.1 Deactivating Your Account</div>
            <div className="pt-space">
              You may deactivate your Service Provider account at any time
              through the platform settings. Upon deactivation, your profile
              will no longer be visible to customers, though your account
              information and history will be retained in accordance with our
              Privacy Policy. You may reactivate your account at any time by
              logging in to the platform.
            </div>
            <div>22.2 Platform Right to Suspend or Terminate</div>
            <div className="pt-space">
              Brod may suspend or terminate your account if we reasonably
              believe that you have breached these Terms and Conditions, engaged
              in fraudulent, unlawful, or inappropriate behaviour, or provided
              false or misleading profile information. We may also take this
              action if you have been inactive for an extended period or if we
              believe that continuation of your access poses a risk to our
              platform or other users.
            </div>
            <div>22.3 Effect of Termination</div>
            <div className="pt-space">
              When your account is terminated or suspended, your profile will no
              longer be visible to customers, and you will lose access to
              customer communications. Any pending customer enquiries will be
              cancelled. Reviews of your services will be retained on our
              platform as they form part of our platform&#39;s historical
              record. Upon termination, you must immediately cease using any
              Brod intellectual property.
            </div>
            <h2 className="pt-h2">23. SURVIVAL OF TERMS</h2>
            <div className="pt-space">
              23.1 Certain provisions of these Terms and Conditions continue to
              apply even after your account is terminated. These include, but
              are not limited to, indemnities you have provided, warranties you
              have made, and limitations of liability.
            </div>
            <h2 className="pt-h2">24. DISPUTE RESOLUTION</h2>
            <div>24.1 Disputes with Customers</div>
            <div className="pt-space">
              Any disputes regarding services, payments, work quality, or other
              matters relating to trade services must be resolved directly
              between you and your customers. Brod is not a party to these
              disputes and does not mediate or resolve issues between Service
              Providers and customers.
            </div>
            <div>24.2 Disputes with Brod</div>
            <div className="pt-space">
              If a dispute arises between you and Brod concerning these Terms or
              your use of the platform, both parties agree to first attempt to
              resolve the dispute through good faith negotiations. The party
              raising the dispute must provide written notice to the other party
              describing the nature of the dispute. Within 14 days of such
              notice, representatives from both parties must meet (in person or
              virtually) to attempt to resolve the dispute.
            </div>
            <div>24.3 Mediation</div>
            <div className="pt-space">
              If the dispute is not resolved through good faith negotiations
              within 30 days of the initial notice, either party may refer the
              dispute to mediation. The mediation will be conducted in Sydney,
              New South Wales and administered by the Australian Disputes Centre
              (ADC). The mediation will be conducted according to the ADC
              Mediation Guidelines in force at the time of the dispute. The
              costs of mediation will be shared equally between both parties
              unless agreed otherwise.
            </div>
            <div>24.4 Legal Proceedings</div>
            <div className="pt-space">
              Nothing in these dispute resolution provisions limits either
              party&#39;s right to commence legal proceedings in the courts of
              New South Wales where appropriate, including for urgent
              interlocutory relief.
            </div>
            <h2 className="pt-h2">25. GENERAL TERMS</h2>
            <div>25.1 Discontinuance of Platform</div>
            <div className="pt-space">
              Brod may, at any time and without notice to you, discontinue the
              platform, in whole or in part. We may also exclude any Service
              Provider from using the platform at our sole discretion. We are
              not responsible for any liability you may suffer arising from or
              in connection with any such discontinuance or exclusion, including
              loss of business opportunities or customer connections.
            </div>
            <div>25.2 Warranties and Disclaimers</div>
            <div className="pt-space">
              We do not guarantee that your use of Brod will be uninterrupted,
              timely, secure, or error-free. You expressly agree that your use
              of, or inability to use, the platform is at your sole risk. The
              platform is provided &#39;as is&#39; and &#39;as available&#39;
              for your use, without any representation, warranties, or
              conditions of any kind, either express or implied. You are
              responsible for ensuring you have appropriate technical
              capabilities to access and use our platform. We do not warrant
              that the platform will be compatible with all devices or browsers.
            </div>
            <div>25.3 Severability</div>
            <div className="pt-space">
              If any provision of these Terms is held to be void, invalid,
              illegal, or unenforceable, that provision must be read down as
              narrowly as necessary to allow it to be valid or enforceable. If
              it is not possible to read down a provision, that provision is
              severed from these Terms without affecting the validity of the
              remaining provisions.
            </div>
            <div>25.4 No Waiver</div>
            <div className="pt-space">
              Brod&#39;s failure to exercise or enforce any right or provision
              of these Terms shall not constitute a waiver of such right or
              provision.
            </div>
            <div>25.5 Interpretation</div>
            <div className="pt-space">
              The headings in these Terms are included for convenience only and
              will not limit or otherwise affect these Terms.
            </div>
            <div>25.6 Entire Agreement</div>
            <div className="pt-space">
              These Terms constitute the entire agreement between you and Brod
              regarding the use of our platform, superseding any prior
              agreements or understandings.
            </div>
            <div>25.7 Governing Law</div>
            <div className="pt-space">
              Your use of our Site or Products or services are governed by the
              laws of New South Wales (NSW) Australia. You irrevocably and
              unconditionally submit to the exclusive jurisdiction of the courts
              operating in NSW Australia and any courts entitled to hear appeals
              from those courts and waive any right to object to proceedings
              being brought in those courts.
            </div>
            <div>25.8 Contact</div>
            <div className="pt-space">
              Any questions or complaints relating to these Terms, or our
              platform should be directed to support@brod.com.au.
            </div>
          </>
        )}
      </div>
      {!acceptedCookies && <Cookies showCookies={true} />}
    </div>
  );
};

export default TermsAndConditionsPage;
