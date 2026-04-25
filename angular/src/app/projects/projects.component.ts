import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Flower Show 2026',
      image: '/images/image3.jpg',
      organizer: 'Navsari Municipal Corporation',
      location: 'Lunsikui Ground, Navsari, Gujarat.',
      timeline: 'Jan 25, 2026 – Jan 30, 2026',
      budget: '₹2.64 crore',
      description: 'A beautiful flower exhibition showcasing seasonal and exotic flowers. Activities included workshops, competitions and photography events.'
    },
    {
      title: 'Glow Garden 2026',
      image: '/images/glow garden.jpg',
      organizer: 'Navsari Municipal Corporation',
      location: 'Dudhiya Talav, Asha Nagar, Navsari.',
      timeline: 'Dec 01, 2025 – Dec 31, 2025',
      budget: '₹2.7 crore - ₹3.2 crore',
      description: 'Glow Garden festival with illuminated pathways, artistic light installations, musical fountain shows, and interactive gardens for families and tourists.'
    },
    {
      title: 'Sharbatiya Talab Rejuvenation Project',
      image: '/images/navsari-talav.jpg',
      organizer: 'Navsari Municipal Corporation',
      location: 'Sharbatiya Talab, Near Lunsikui Road, Navsari, Gujarat 396445',
      timeline: 'Work in Progress (Project currently under development)',
      budget: 'Official final budget not yet publicly confirmed',
      description: 'The Sharbatiya Talab Rejuvenation Project is currently underway to restore and improve one of Navsari’s important water bodies. The initiative focuses on lake cleaning, water retention improvement, and environmental enhancement around the surrounding area. Once completed, the project is expected to support better water management and improve the overall ecological condition of the site. The work is ongoing, and final completion details will be updated after official confirmation.'
   },
   {
      title: 'New Bus Depot 2026',
      image: '/images/bus depot.jpg',
      organizer: 'Navsari Municipal Corporation',
      location: 'Parisima Apartment, Court Rd, Kaliyawadi, Navsari, Gujarat',
      timeline: 'Nov 25, 2025',
      budget: '₹82+ crore',
      description: 'A modern bus depot built to improve city transportation infrastructure. Includes multiple bus bays, waiting lounges, ticket counters, parking area, and modern sanitation facilities. The depot aims to handle increasing public transport demand efficiently and provide comfortable amenities for passengers.'
   }

  ];
}
