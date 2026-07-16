# Resume wording comparison

Sources:

- [Original PDF extraction](./original-resume-wording.md)
- [Future HTML extraction](./future-resume-wording.md)

## Reviewed wording differences

| Section | Original PDF | Future HTML | Classification |
| --- | --- | --- | --- |
| Summary | `Junior Communication & Media Studies major...` | `Senior Communication & Media Studies major...` | Approved update |
| Experience | No Content Strategy Intern entry | `Content Strategy Intern, Northwest Community Media` — `Summer 2026`, with two new bullets | Approved addition |
| Experience | `Barista, Foghorn Coffee` — `2023 to 2024`, with one bullet | Entry removed | Approved removal |
| First-Gen Voices Podcast | `15 episodes and 2,000-plus downloads` | `28 episodes and 4,500-plus downloads` | Approved update |

## Unchanged wording verified

### Header and summary

| Existing wording checked | Result |
| --- | --- |
| `Communication & Media Studies Student \| Storyteller and data-curious` | Exact match |
| `Seattle, WA \| jamie.rivera@cascade.edu \| (555) 018-2470` | Exact match |
| `with a Data Analytics minor who turns ideas into clear stories across writing, audio, and social. Comfortable pairing creative work with simple data to show impact. Looking for roles in content, communications, and community programs.` | Exact match |

### Education

| Existing wording checked | Result |
| --- | --- |
| `Cascade State University, Seattle, WA` | Exact match |
| `Expected May 2027` | Exact match |
| `B.A. in Communication & Media Studies, Minor in Data Analytics \| GPA 3.7 / 4.0` | Exact match |
| `Relevant coursework: Digital Media Production, Intro to Data Analytics, Public Relations Writing, Web Content and Design.` | Exact match |

### Existing experience

| Existing wording checked | Result |
| --- | --- |
| `Marketing and Communications Intern, Greenline Community Trust` | Exact match |
| `Jun 2025 to Present` | Exact match |
| `Seattle, WA` | Exact match |
| `Rebuilt the nonprofit's social presence and grew Instagram following by 40 percent in one semester.` | Exact match |
| `Write and schedule a weekly newsletter that reaches more than 1,200 subscribers.` | Exact match |
| `Produce short-form video recaps of volunteer events, from filming to captions.` | Exact match |
| `Peer Writing Tutor, Cascade State Writing Center` | Exact match |
| `Sep 2024 to Present` | Exact match |
| `Coach 60-plus students per term on essays, resumes, and application materials.` | Exact match |
| `Led two campus workshops on clear, structured writing.` | Exact match |

### Existing projects

| Existing wording checked | Result |
| --- | --- |
| `First-Gen Voices Podcast, Founder and Producer` | Exact match |
| `2024 to Present` | Exact match |
| `Own recording, editing, cover art, and release scheduling.` | Exact match |
| `Campus Recycling Dashboard, Data Analytics Course Project` | Exact match |
| `Analyzed two years of campus waste data and built simple charts showing recycling trends.` | Exact match |
| `Recommended three changes that the campus sustainability office later piloted.` | Exact match |
| `Greenline Content Refresh, Internship Project` | Exact match |
| `Rewrote the Get Involved page and simplified the volunteer signup flow, lifting form completions.` | Exact match |
| `Trail Journal, Personal Project` | Exact match |
| `A growing photo-and-notes log of Pacific Northwest day hikes.` | Exact match |

### Existing skills and involvement

| Existing wording checked | Result |
| --- | --- |
| `Tools: Microsoft 365 (Word, Excel, PowerPoint), Canva, Adobe Express, Audacity, basic HTML and CSS, Git and GitHub (learning)` | Exact match |
| `Data: Spreadsheets, basic charting, survey design` | Exact match |
| `Communication: Copywriting, public speaking, social media strategy` | Exact match |
| `Languages: English (native), Spanish (conversational)` | Exact match |
| `Founder, First-Gen Voices Podcast (2024 to Present)` | Exact match |
| `Member, Campus Sustainability Club` | Exact match |
| `Volunteer, Seattle Public Library reading program` | Exact match |

### Numeric, punctuation, and symbol details

| Detail | Original PDF | Future HTML | Result |
| --- | --- | --- | --- |
| GPA | `3.7 / 4.0` | `3.7 / 4.0` | Exact match |
| Instagram growth | `40 percent` | `40 percent` | Exact match |
| Newsletter reach | `1,200 subscribers` | `1,200 subscribers` | Exact match |
| Tutoring volume | `60-plus students` | `60-plus students` | Exact match |
| Date wording | `Jun 2025 to Present` | `Jun 2025 to Present` | Exact match |
| Date wording | `Sep 2024 to Present` | `Sep 2024 to Present` | Exact match |
| Podcast metric | `15 episodes and 2,000-plus downloads` | `28 episodes and 4,500-plus downloads` | Approved update |
| Skill punctuation | `Git and GitHub (learning)` | `Git and GitHub (learning)` | Exact match |

Neither artifact says `60+`; both use the exact wording `60-plus`.

## Extraction-format differences excluded

The raw Markdown diff also shows non-content differences caused by converting different source formats:

- PDF headings are uppercase plain text; HTML headings become Markdown headings.
- PDF bullets use `•`; HTML bullets become `*`.
- The PDF converter sometimes places right-column dates later in the extracted text.
- The HTML converter uses Markdown bold around skill labels.
- PDF line wrapping differs from HTML paragraph wrapping.

These are conversion/layout differences, not resume wording changes.

## Result

**PASS:** The four approved updates are the only semantic wording differences between the two extracted artifacts.
