import React from "react";
import "../styles/PolicyTerms.css";
import Header from "../components/Header";
import Cookies from "../components/Cookies";

const PrivacyPolicyPage = () => {
  const acceptedCookies = document.cookie.includes("Brod");
  return (
    <div>
      <Header />
      <div className="pt">
        <h1 className="pt-h1">PRIVACY POLICY</h1>
        <div className="pt-space">
          Deventa Pty Ltd trading as Brod (&quot;Brod&quot;, &quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) is committed to protecting the
          privacy of Customers and Service Providers who use our platform. We
          handle all personal information in accordance with the Privacy Act
          1988 (Cth) and the Australian Privacy Principles (APPs). This Privacy
          Policy explains how we collect, use, disclose, and safeguard your
          information when you use our platform.
        </div>
        <h3 className="pt-h3">Your Consent and Acknowledgment</h3>
        <div className="pt-space">
          By creating an account and using our platform, you confirm that you
          have read and understood this Privacy Policy. You consent to the
          collection, use, and processing of your personal information as
          described in this policy. This consent is given freely and with full
          understanding of how your information will be used.
        </div>
        <div className="pt-space">
          You can withdraw your consent at any time by contacting us at
          support@brodcom.au, though this may affect our ability to provide you
          with platform services.
        </div>
        <h2 className="pt-h2">1. ABOUT THIS POLICY</h2>
        <div>1.1 Scope </div>
        <div className="pt-space">
          This Privacy Policy explains how we collect, use, store, and disclose
          personal information when you use the Brod platform, whether as a
          Customer or Service Provider.
        </div>
        <div>1.2 Updates </div>
        <div className="pt-space">
          to Policy We may update this Privacy Policy from time to time to
          reflect changes in our practices or for legal and regulatory reasons.
          We will notify you of material changes through the platform or via
          your registered email address. Your continued use of our platform
          after such notifications constitutes acceptance of the updated policy.
        </div>
        <h2 className="pt-h2">2. INFORMATION WE COLLECT</h2>
        <div>2.1 Customer Information</div>
        <div className="pt-space">
          When you use our platform as a Customer, we collect information
          necessary to provide our services. This includes your name, email
          address, and your location and service area preferences. We also
          collect information about your service requests, requirements, and any
          communications you have with Service Providers. Your platform usage
          data and activity are also collected to facilitate platform
          operations.
        </div>
        <div>2.2 Service Provider Information</div>
        <div className="pt-space">
          For Service Providers, we collect business-related information
          including your business name, location, email address and ABN. We also
          collect information about your service categories and areas, and your
          qualifications, and experience if provided. Your business description,
          photos, service pricing information, and communications with Customers
          are stored to maintain your profile. We track your platform usage data
          and activity to ensure quality service delivery.
        </div>
        <div>2.3 Technical Information</div>
        <div className="pt-space">
          For all platform users, we automatically collect certain technical
          information. This includes your device information and IP addresses,
          browser type and settings, and operating system details. We also
          collect platform usage statistics and login activity. Location data
          may be collected with your consent to facilitate service matching and
          delivery.
        </div>
        <h2 className="pt-h2">3. HOW WE USE YOUR INFORMATION</h2>
        <div>3.1 Platform Operation</div>
        <div className="pt-space">
          We use your personal information to create and manage your account and
          facilitate connections between Customers and Service Providers. This
          includes processing your requests and responding to inquiries. We also
          use this information to maintain platform security, improve our
          services, and comply with our legal obligations.
        </div>
        <div>3.2 Communications</div>
        <div className="pt-space">
          Your contact information enables us to send essential platform
          notifications and facilitate messaging between Customers and Service
          Providers. We use this information to provide customer support and
          send service updates and maintenance notifications. With your consent,
          we may also send marketing communications about platform services and
          features.
        </div>
        <div>3.3 Service Providers</div>
        <div className="pt-space">
          For Service Providers, we use your information to display your
          business profile to potential customers and manage your service
          listings and availability. This information allows us to maintain
          platform quality and safety standards. Your information helps us
          ensure reliable service delivery through our platform.
        </div>
        <div>3.4 Customers</div>
        <div className="pt-space">
          For Customers, we use your information to match you with appropriate
          Service Providers based on your requirements and location. This
          information enables us to process your service requests efficiently
          and facilitate review submissions. We may also use this information to
          provide relevant service recommendations based on your previous
          interactions.
        </div>
        <h2 className="pt-h2">4. INFORMATION SHARING AND COMMUNICATIONS</h2>
        <div>4.1 Platform Visibility and Initial Contact</div>
        <div className="pt-space">
          Service Provider profiles are publicly visible on our platform and
          include business name, service areas, and business description. When a
          Customer views a Service Provider&#39;s profile, they can see reviews,
          ratings, and general service information. Initial contact is made
          through our platform&#39;s messaging system. After this initial
          connection, Customers and Service Providers may exchange contact
          details, location information, and other relevant information directly
          with each other. Brod does not control or monitor information that
          users choose to share directly with each other outside the platform.
        </div>
        <div>4.2 Platform Communications</div>
        <div className="pt-space">
          Our platform includes a messaging system that enables Customers and
          Service Providers to communicate. We collect and store these
          communications to operate our platform and provide our services. We
          may monitor these communications for platform safety, fraud
          prevention, and policy compliance. However, we do not control what
          information users choose to share with each other through these
          communications. Any personal information shared in platform
          communications is at the discretion of the users, and once contact
          details are shared, subsequent communications may occur outside our
          platform.
        </div>
        <div>4.3 Information Exchange</div>
        <div className="pt-space">
          During platform communications, Service Providers may request
          necessary information such as service locations and contact details,
          while Customers may receive quotes, invoices, and other business
          documents. Users may choose to exchange phone numbers, email
          addresses, or physical addresses as needed for service delivery. We
          cannot control how users store or use information shared with them,
          and information shared directly between users falls outside our
          control and responsibility.
        </div>
        <div>4.4 Communication Monitoring and Records</div>
        <div className="pt-space">
          We monitor and maintain records of platform communications for
          specific purposes including detecting policy violations, preventing
          fraud or misuse, ensuring platform safety, improving our services,
          resolving disputes, and providing customer support. These records are
          stored securely and may be accessed for the purposes described in this
          policy. You may request access to your communication records by
          contacting us.
        </div>
        <h2 className="pt-h2">5. DATA STORAGE AND SECURITY</h2>
        <div>5.1 Data Storage</div>
        <div className="pt-space">
          Your personal information is stored securely within Australia. In
          cases where we engage third-party service providers who store data
          overseas, we ensure appropriate data protection measures are in place
          in accordance with Australian privacy laws.
        </div>
        <div>5.2 Security Measures</div>
        <div className="pt-space">
          We implement reasonable security measures to protect your information
          through encryption of data in transit and at rest. Our platform
          maintains secure server infrastructure with access controls and
          authentication requirements. We conduct regular security assessments
          and updates, and ensure our staff are trained in data protection
          practices.
        </div>
        <div className="pt-space">5.3 Data Retention</div>
        <div>Active Accounts</div>
        <div className="pt-space">
          While your account remains active, we retain all account information
          and activity history to provide our services. For Service Providers,
          this includes profile information, service history, and reviews. For
          Customers, this includes service requests, communication history, and
          review submissions.
        </div>
        <div>Deactivated Accounts</div>
        <div className="pt-space">
          When you deactivate your account, we retain basic account information
          and platform activity data for 2 years. This period allows for account
          reactivation and maintains platform integrity while being
          proportionate to the nature of our service.
        </div>
        <div>Deleted Accounts</div>
        <div className="pt-space">
          If you request account deletion, we will permanently delete your
          personal information within 30 days, except where we must retain
          certain information to:
        </div>
        <div className="pt-list">
          <div>a) Comply with legal obligations</div>
          <div>b) Resolve disputes</div>
          <div>c) Enforce our terms</div>
          <div>d) Prevent fraud or abuse</div>
          <div>e) Maintain platform integrity</div>
        </div>
        <div>Review and Rating Information</div>
        <div className="pt-space">
          Reviews and ratings remain on the platform even if an account is
          deleted but will be de-identified to maintain platform integrity while
          protecting privacy.
        </div>
        <div>Platform Usage Data</div>
        <div className="pt-space">
          We retain de-identified platform usage data and aggregated statistics
          for platform improvement and business planning purposes.
        </div>
        <h2 className="pt-h2">6. YOUR PRIVACY RIGHTS</h2>
        <div>6.1 Access to Information</div>
        <div className="pt-space">
          You have the right to access your personal information held by us.
          This includes the right to know what information we hold about you and
          how we have used or disclosed it. We will provide this information
          within 30 days of your request.
        </div>
        <div>6.2 Correction of Information</div>
        <div className="pt-space">
          You have the right to request correction of any personal information
          we hold about you that is inaccurate, out of date, incomplete,
          irrelevant, or misleading. We will respond to correction requests
          within 30 days and notify any third parties who may have received
          incorrect information.
        </div>
        <div>6.3 Data Portability</div>
        <div className="pt-space">
          You may request a copy of your personal information in a structured,
          commonly used format. This includes your profile information,
          communication history, and platform activity data.
        </div>
        <div>6.4 Consent and Control</div>
        <div className="pt-space">You have the right to:</div>
        <div className="pt-list">
          <div>a) Withdraw consent for optional data processing</div>
          <div>b) Object to direct marketing</div>
          <div>c) Request restriction of data processing</div>
          <div>
            d) Choose to remain anonymous or use a pseudonym where practical
          </div>
          <div>
            e) Know where your information is stored and who has access to it
          </div>
        </div>
        <div>6.5 Deletion Rights</div>
        <div className="pt-space">
          You may request deletion of your personal information. We will comply
          with such requests unless we are required to retain certain
          information for legal or legitimate business purposes. We will inform
          you if we cannot delete certain information and explain why.
        </div>
        <div>6.6 Exercise of Rights</div>
        <div className="pt-space">
          You can exercise these rights by contacting us at support@brod.com.au.
          We will respond within 30 days. If we need more time due to
          complexity, we will notify you and explain why.
        </div>
        <h2 className="pt-h2">7. COOKIES AND TRACKING</h2>
        <div>7.1 Cookie Usage</div>
        <div className="pt-space">
          Our platform uses cookies and similar technologies to maintain your
          platform session and remember your preferences. These technologies
          help us understand how you use our platform, enabling us to improve
          our services and protect platform security.
        </div>
        <div>7.2 Cookie Types</div>
        <div className="pt-space">
          Our platform uses essential cookies necessary for platform operation
          and functional cookies that enhance user experience. We also employ
          analytical cookies for performance monitoring and may use third-party
          cookies for additional features. You can control cookie settings
          through your browser preferences, though disabling certain cookies may
          limit platform functionality.
        </div>
        <h2 className="pt-h2">8. DATA BREACH PROCEDURES</h2>
        <div>8.1 Breach Response</div>
        <div className="pt-space">
          In the event of a data breach, we assess the breach and potential
          risks and take immediate steps to contain it. Where required, we
          notify affected individuals and report to the Office of the Australian
          Information Commissioner. Following any breach, we review and
          strengthen our security measures to prevent future incidents.
        </div>
        <div>8.2 Notification Process</div>
        <div className="pt-space">
          If a breach occurs that is likely to result in serious harm, we will
          promptly notify affected individuals. Our notification will describe
          the breach, the type of information involved, and steps we are taking
          to address it. We will provide recommendations for affected
          individuals and contact information for further questions.
        </div>
        <h2 className="pt-h2">9. DIRECT MARKETING</h2>
        <div>9.1 Marketing Communications</div>
        <div className="pt-space">
          We may send platform-related marketing communications to keep you
          informed about new features, service improvements, and relevant
          updates. These communications will only relate to our platform
          services. You can manage your communication preferences or opt out of
          marketing communications at any time through your account settings or
          by following the unsubscribe instructions in our communications.
        </div>
        <div>9.2 Third-Party Marketing</div>
        <div className="pt-space">
          We do not sell, rent, or share your personal information with third
          parties for their marketing purposes. Your information is used solely
          for platform-related communications and services.
        </div>
        <h2 className="pt-h2">10. CONTACT AND COMPLAINTS</h2>
        <div>10.1 Privacy Concerns</div>
        <div className="pt-space">
          You may contact us with any privacy-related questions or concerns at
          support@brod.com.au. We will acknowledge your inquiry within 7 days
          and work to resolve it within 30 days. For complex matters that may
          require more time, we will keep you informed of our progress.
        </div>
        <div>10.2 Making a Complaint</div>
        <div>
          If you believe we have mishandled your personal information, you may
          lodge a complaint with us directly through support@brod.com.au. We
          will investigate your complaint and respond within 30 days. If you are
          not satisfied with our response, you can contact the Office of the
          Australian Information Commissioner.
        </div>
      </div>
      {!acceptedCookies && <Cookies showCookies={true} />}
    </div>
  );
};

export default PrivacyPolicyPage;
