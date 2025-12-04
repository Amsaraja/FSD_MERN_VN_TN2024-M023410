import React from 'react'


export default function About(){
return (
<div className="container">
<div style={{marginTop:12}}>
<h1>About Our College</h1>
<p className="muted">Our college was established in 1995 with a vision to provide quality technical education.</p>


<section style={{marginTop:12}}>
<h2>Mission & Vision</h2>
<p className="muted"><strong>Mission:</strong> To create industry-ready graduates with ethical values.</p>
<p className="muted"><strong>Vision:</strong> To be a center of excellence for teaching and research.</p>
</section>


<section style={{marginTop:12}}>
<h2>Achievements</h2>
<div className="grid" style={{marginTop:8}}>
<div className="card"><h4>National Ranking</h4><p className="muted">Ranked in top 200 colleges nationwide.</p></div>
<div className="card"><h4>Research Grants</h4><p className="muted">Secured multiple research grants from industry and government.</p></div>
<div className="card"><h4>Alumni Impact</h4><p className="muted">Alumni working at global tech and business firms.</p></div>
<div className="card"><h4>Industry Partnerships</h4><p className="muted">Strong collaborations with leading companies for internships and placements.</p></div>
</div>
</section>
</div>
</div>
)
}